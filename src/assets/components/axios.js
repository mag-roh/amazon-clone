import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-c9b22/us-central1/api", //the cloud function api
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
  //   },
});
export default instance;
