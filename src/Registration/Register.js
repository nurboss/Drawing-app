import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import UseAuth from '../firebase/AuthProvider/UseAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import google from '../loader/img/google.svg'
import Preloader from '../loader/Preloader';

const Register = () => {
    const [ email, setEmail] = useState('');
    const [ pass, setPass] = useState('');
    const [ secpass, setsecPass] = useState('');
    const [ name, setName] = useState('');

    const { googleSignin, user, error, isLoading, registerUser } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoogleSignin = () => {
      if (!user?.email) {
          googleSignin(location, navigate);
      } else {
          alert("please Logout first!")
      }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (user.email) {
            alert('Please logout first')
        } else {
            if (pass !== secpass) {
                alert("Password does not matched!")
                return;
            }
            registerUser(email, pass, name, navigate)
        }
    }
  
  const emailField = (e) => {
    setEmail(e.target.value);
  }
  const firstPasswordField = (e) => {
    setPass(e.target.value);
  }
  const secPasswordField = (e) => {
    setsecPass(e.target.value);
  }
  const nameField = (e) => {
    setName(e.target.value);
  }
  return (
    <>
    <div className='login-container'>
      <div className='fixed-container'>
          <div className='two-half-container'>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login<br /> with your personal info.</p>
              <Link to="/login"><button className='signup-btn'>LOGIN</button></Link>
              
          </div>
          <div className='one-half-container'>
                  <h1>Create Account</h1>
                  <img onClick={handleGoogleSignin} src={google} className='icon-btn' alt=""></img>
                  { !isLoading && 
                  <form className='login-form' onSubmit={handleRegister} >
                    <input type="text" placeholder='Name' onChange={nameField}></input>
                    <input type="email" placeholder='Email' onChange={emailField}></input>
                    <input type="password" placeholder='Password' onChange={firstPasswordField}></input>
                    <input type="password" placeholder='Password' onChange={secPasswordField}></input>
                    <input type="submit" value="Register"></input>
                  </form>}

                  {isLoading && <Preloader />}
                  <p>{error}</p> 

          </div>
      </div>
    </div>
 
    </>
  )
}

export default Register