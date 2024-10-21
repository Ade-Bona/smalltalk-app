import React, { useState } from 'react'
import './login.css'
import assets from '../../assets/assets'
import { signup, login, resetPass } from '../../config/firebase'

const Login = () => {

  const [currState, setCurrState] = useState("Sign Up");

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === 'Sign Up') {
      signup(username, email, password);
    } else {
      login(email, password)
    }
  }


  return (
    <div className='login'>
      <div className='logo'>
        <img src={assets.logo_icon} alt="" />
        <p>Sm<span>a</span>llT<span>a</span>lk</p>
      </div>
      <form className="login-form" onSubmit={onSubmitHandler}>
        <h2>{currState}</h2>
        {currState === "Sign Up" ? <input onChange={(e) => setUserName(e.target.value)} value={username} type="text" placeholder='Username' required className="form-input" /> : null}
        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email Address" required className="form-input" />
        <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className="form-input" />
        <button type="submit">{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        <div className="login-term">
          {currState === 'Sign Up' ? <input type="checkbox" /> : null}
          {currState === 'Sign Up' ? <p>Agree to the terms of use & privacy policy</p> : null}
        </div>
        <div className="login-forgot">
          {
            currState === 'Sign Up' ?
              <p className="login-toggle">Already have an account? <span onClick={() => setCurrState('Login')}>login here</span></p>
              :
              <p className="login-toggle">Don't have an account? <span onClick={() => setCurrState('Sign Up')}>create one</span></p>
          }
          {
            currState === "Login"
            ?
            <p className="login-toggle">Forgot Password? <span onClick={() => resetPass(email)}>reset password here</span></p>
            :
            null

          }
        </div>
      </form>
    </div>
  )
}

export default Login