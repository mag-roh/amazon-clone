import '../css/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { auth } from "./firebase";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = (e) => { 
    e.preventDefault();
    auth.
      signInWithEmailAndPassword(email, password)
      .then(auth => {
        if(auth)
      navigate("/");
    })
    .catch(error => alert(error.message));
  }
  const register = (e) => {
    e.preventDefault();
    auth.
      createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        //successfully created a new user with email and password
        if (auth) {
          navigate("/");
        }
      })
    .catch((error) => alert(error.message));
  }
  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1 className="login__title">Sign In</h1>
        <form action="">
          <h5>E-mail</h5>
          <input value={email} onChange={e => setEmail(e.target.value)}type="email" placeholder="Email" />
          <h5>Password</h5>
          <input value={password} onChange={e => setPassword(e.target.value)}type="password" placeholder="Password" />
          <button type='submit' onClick={signIn} className='login__signInButton'>Sign In</button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button onClick={register} className='login__registerButton'>Create your Amazon Account</button>
      </div>
    </div>
  );
}

export default Login