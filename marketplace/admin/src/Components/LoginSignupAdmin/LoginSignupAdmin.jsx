import React, { useState } from 'react'
import './LoginSignupAdmin.css'

const LoginSignupAdmin = () => {

    const [state,setState] = useState("Login");
    const [formData,setformData] = useState({
        username:"",
        password:"",
        email:""
  })

  const changeHandler = (e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
        const response = await fetch('http://localhost:4000/admin/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/allusers");
            alert("Account successfully logged in.");
        } else {
            alert(responseData.errors);
        }
    }

const signup = async () => {
    console.log("SignUp Function Executed", formData);
        const response = await fetch('http://localhost:4000/admin/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/allusers");
            alert("Account successfully signed up.");
        } else {
            alert(responseData.errors);
            alert('An error occurred during signup. Please try again.');
        }
    } 



  return (
    <div className='loginsignup'>
    <div className='loginsignup-container'>
      <h1>{state}</h1>
      <div className="loginsignup-fields">
        {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />:<></>}
        <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
        <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
      </div>
      <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button> 
      {state==="Sign Up"
      ?<p className="loginsignup-login">Already have an account? <span onClick={()=>{setState("Login")}}>Login here </span></p>
      :<p className="loginsignup-login">Create an account. <span onClick={()=>{setState("Sign Up")}}>Sign Up here </span></p>}
      
      
      <div className="loginsignup-agree">
        <input type="checkbox" name='' id='' />
        <p>By continuing, I agree to the terms of use & privacy policy.</p>
      </div>
    </div>
  </div>
  )
}

export default LoginSignupAdmin