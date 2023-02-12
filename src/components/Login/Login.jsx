import React, { useState } from 'react'
import './Login.css'
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMsg('Logged in successfully, you will now be automatically redirected to Home page.')
        setPassword('')
        setEmail('')
        setErrorMsg('')

        setTimeout(() => {
          setSuccessMsg('');
          navigate('/home')
        }, 1000)

      })
      .catch((error) => {
        // const errorCode = error.code;
        console.log(error.message);
        setErrorMsg(error.message);
        // if (error.message === 'Firebase:Error (auth/invalid-email).') {
        //   setErrorMsg('Please fill all required fields')
        // }
        // if (error.message === 'Firebase:Error (auth/email-already-in-use).') {
        //   setErrorMsg('user already exists')
        // }

      })
    // e.reset()
  }

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form className="login-form">
          <p>Login</p>
          {successMsg && <><div className="success-msg">
            {successMsg}
          </div></>}
          {errorMsg && <><div className="error-msg">
            {errorMsg}
          </div></>}


          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)}
            type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input onChange={(e) => setPassword(e.target.value)}
            type="password" placeholder="Enter Your Password" />


          <button onClick={handleLogin}>Login</button>

          <div>
            <span>Dont have an Account?</span>
            <Link to="/signup">Sign up</Link>
          </div>

        </form>
      </div>


    </div>
  );
}

export default Login