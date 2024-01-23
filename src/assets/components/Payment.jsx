import "../css/Payment.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
const Payment = () => {
  const [{ basket, user }] = useStateValue();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer, the clientSecret changes whenever the contents in the basket change
    const getClientSecret = async () => {
      const response = await axios({
        method: "POST",
        //stripe expects payments in a currencies subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`, // ?total: query param
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);

  console.log("client secret >>>", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //destructuring and extracting the paymentIntent from the response
        //if the payment is successful, the paymentIntent will have a status of succeeded
        //set the payment as successful
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        //send the paymentIntent to the server
        //redirect the user to the home page
        navigate("/orders");
      });
  };

  const handleChange = (e) => {
    //Listen for the changes in the CardElement and display the errors as the customer types their card details
    setDisabled(e.empty); //if the event is empty the button will be disabled
    setError(e.error ? e.error.message : ""); //if there is an error the error will be displayed
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout(<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/*Payment Section - delivery address*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Porur, Chennai</p>
            <p>Tamil Nadu</p>
          </div>
        </div>
        {/*Payment Section - Review items*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                key={item.id}
              />
            ))}
          </div>
        </div>
        {/*Payment Section - payment method*/}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2} //shows upto two decimal places
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {/*Error*/}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
