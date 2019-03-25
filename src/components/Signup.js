import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import { fire } from '../fire'

const loginStyles = {
  width: "90%",
  maxWidth: "315x",
  margin: "20px auto",
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px"
}
class Signup extends Component {

  constructor(props) {
    super(props)
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
    this.state = {
      redirect: false
    }
  }


  authWithEmailPassword(event) {
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value
    fire.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0) {
          //create user new user
          return fire.auth().createUserWithEmailAndPassword(email, password)
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


      <div style={loginStyles} className="container text-center login-container">

        <h1 className="login-header">Feenix</h1>
        <p className="app-decription text-muted">Sign Up</p>

        <Toaster ref={(element) => { this.toaster = element }} />

        <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
          <label className="pt-label">
            Email
              <input style={{ width: "100%" }} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
          </label>
          <label className="pt-label">
            Password
              <input style={{ width: "100%" }} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
          </label>

          {/* <label className="pt-label">
              Password Confirmation
              <input style={{width: "100%"}} className="pt-input" name="password2" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
            </label> */}
          <input style={{ width: "100%" }} type="submit" className="btn btn-dark" value="Sign Up"></input>
        </form>
        <div style={{ marginBottom: "10px" }} className="pt-callout pt-icon-info-sign">
        </div>
      </div>
    )
  }
}

export default Signup;