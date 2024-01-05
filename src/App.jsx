import "./App.css";
import Checkout from "./assets/components/Checkout";
import Header from "./assets/components/Header";
import Home from "./assets/components/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./assets/components/Login";
import { useEffect } from "react";
import { auth } from "./assets/components/firebase";
import { useStateValue } from "./assets/components/StateProvider";
function App() {
  const [{}, dispactch] = useStateValue();
  useEffect(() => {
    //will only run once the app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>',authUser);
      if (authUser) {
        //user is logged in 
        dispactch({
          type: "SET_USER",
          user: authUser
        })
      }
      else {
        //user is not logged in
        dispactch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (
    <div className="app">
      {/*Header*/}
      
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route
          path="/checkout"
          element={
            <>
              {/*Checkout*/}
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              {/*Home*/}
              <Header />
              <Home />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
