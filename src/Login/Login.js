import React, { useState } from 'react';
// import { FcGoogle } from "react-icons/fc";
import UseAuth from '../firebase/AuthProvider/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Preloader from '../loader/Preloader';
import google from '../loader/img/google.svg'
import './Login.css'

const Login = () => {
    const [ email, setEmail] = useState('');
    const [ pass, setPass] = useState('');

    const { googleSignin, user, error, isLoading, signinUser } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignin = () => {
      if (!user?.email) {
          googleSignin(location, navigate);
      } else {
          alert("please Logout first!")
      }
    }

    //  login user 
     const handleLogin = (e) => {
      e.preventDefault();
      signinUser(email, pass, location, navigate)
  }
  
  const emailField = (e) => {
    setEmail(e.target.value);
  }
  const passwordField = (e) => {
    setPass(e.target.value);
  }
 

    return (
    <>
      <div className='login-container'>
        <div className='fixed-container'>
          <div className='two-half-container'>
              <h1>Hellow, Friend!</h1>
              <p>Enter your personal details and start <br /> journey with us.</p>
              <Link to="/registration"><button className='signup-btn'>REGISTER </button> </Link>           
          </div>
          <div className='one-half-container'>
            <h1>Sign in</h1>
            <img onClick={handleGoogleSignin} src={google} className='icon-btn' alt=""></img>
                { !isLoading && 
                <form className='login-form' onSubmit={handleLogin} >
                  <input type="email" placeholder='Email' onChange={emailField}></input>
                  <input type="password" placeholder='Password' onChange={passwordField}></input>
                  <input type="submit" value="Login"></input>
                </form>}
                {isLoading && <Preloader />}
                <p>{error}</p>
                
          </div>
        </div>
      </div>
    </>
    );
};

export default Login;