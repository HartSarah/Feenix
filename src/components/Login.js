import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import { fire, facebookProvider} from '../fire'

const loginStyles  = {
width: "90%",
maxWidth: "315x",
margin: "20px auto",
border: "1px solid #ddd",
borderRadius: "5px",
padding: "10px"
}
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

  authWithEmailPassword(event){
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value

    //great for checking inputs in a form type structure
    // console.table([{
    //   email: this.emailInput.value,
    //   password : this.passwordInput.value
    // }])

    fire.auth().fetchProvidersForEmail(email)
    .then((providers)=>{
      //three options
      if(providers.length === 0){
        //create user new user
        return fire.auth().createUserWithEmailAndPassword(email, password)
      } else if (providers.indexOf("password") === -1) {
        // they used facebook
        this.loginForm.reset() //clears form 
        this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
      }else{
        //sign user in
        return fire.auth().signInWithEmailAndPassword(email, password);
      }
    })
    .then((user)=>{
      if (user && user.email) {
        this.loginForm.reset()
       // this.props.setCurrentUser(user)
        this.setState({redirect: true})
      }
    })
    .catch((error)=>{
      this.toaster.show({intent: Intent.DANGER, message: error.message})
    })
  }

    render() {
      const { from } = this.props.location.state || { from: { pathname: '/UserDashboard' } }
      if(this.state.redirect=== true){
        return <Redirect to= {from}  />
      }
      return (
       
        <div style={loginStyles} className="container text-center login-container">
         <div>
                 <h1 className="login-header">Feenix</h1>
                <p className="app-decription text-muted">My App Description</p>

        </div>
          <Toaster ref={(element) => { this.toaster = element }} />
          <button style={{width: "100%"}} className= "btn btn-dark" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>
          <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
          <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
            <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
              <h5>Note</h5>
              If you don't have an account already, this form will create your account.
            </div>
            <label className="pt-label">
              Email
              <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
            </label>
            <label className="pt-label">
              Password
              <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
            </label>
            <input style={{width: "100%"}} type="submit" className="btn btn-dark" value="Log In"></input>
          </form>
        </div>
      )
    }
  }


export default Login
