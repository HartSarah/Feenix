import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import { fire, facebookProvider } from '../fire'
import Signup from './Signup';
import "./Login.css";


class Login extends Component {

  constructor(props) {
    super(props)
    this.authWithFacebook = this.authWithFacebook.bind(this)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }

  authWithFacebook() {
    fire.auth().signInWithPopup(facebookProvider)
      .then((user, error) => {
        if (error) {
          this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
        } else {
          //this.props.setCurrentUser(user);
          this.setState({ redirect: true })
        }
      })
  }

  authWithEmailPassword(event) {
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value

    //great for checking inputs in a form type structure
    // console.table([{
    //   email: this.emailInput.value,
    //   password : this.passwordInput.value
    // }])

    fire.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        //three options
        // if(providers.length === 0){
        //   //create user new user
        //   return fire.auth().createUserWithEmailAndPassword(email, password)
        // }


        if (providers.indexOf("password") === -1) {
          // they used facebook
          this.loginForm.reset() //clears form 
          this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
        }
        else {
          //sign user in
          return fire.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then((user) => {
        if (user && user.email) {
          this.loginForm.reset()
          // this.props.setCurrentUser(user)
          this.setState({ redirect: true })
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/UserDashboard' } }
    if (this.state.redirect === true) {
      return <Redirect to={from} />
    }
    return (

      <div className="container text-center login-container">
        <div>
          <h1 className="login-header">Feenix</h1>
          <p className="text">
          Please enter your email and password<br/>
          Or log in with Facebook 
          </p>
        </div>

        <p></p>

        <Toaster ref={(element) => { this.toaster = element }} />

        <p></p>
        <div>
          <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>

            <label className="pt-label">
              <input className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
            </label>

            <p></p>

            <label className="pt-label">
              <input className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
            </label>

            <p></p>

            <input type="submit" className="button" value="Log In"></input>

          </form>
        </div>
        <p></p>
        <button className="button" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>

        <div className="pt-callout pt-icon-info-sign">

        </div>

        <p></p>
        <div className="text">
          Don't have an account? <a href="/Signup" > Register Here</a>
        </div>

      </div>
    )
  }
}

export default Login;