import '../css/Subtotal.css'; 
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
const Subtotal = () => {
  const navigate = useNavigate();
  const [{ basket }] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2} //shows upto two decimal places
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => navigate("/payment")}>Proceed to Checkout</button>
    </div>
  );
};

export default Subtotal;