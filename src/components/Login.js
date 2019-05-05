import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Toaster, Intent } from "@blueprintjs/core";
import { fire, facebookProvider } from "../fire";

class Login extends Component {
  //initialising as the default which are altered later.
  state = {
    email: "",
    password: ""
  };

  //this method take current state of email and password and map them to a const data type
  authWithEmailPassword = () => {
    const { email, password } = this.state;
  //here we are connecting to the database/ verifiying general users credentials(using a promise to achieve this)
    fire
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        //errors handers for both incoorect input.
        if (providers.indexOf("password") === -1) {
          this.toaster.show({
            intent: Intent.WARNING,
            message: "User not found or password was incorrect"
          });
        } else {
          return fire.auth().signInWithEmailAndPassword(email, password);
        }
      })
      //if user macthes with the database then they wil bve directed to the create profile page.
      .then(user => {
        if (user) {
          this.props.history.push("/CreateProfile");
        }
      })
      .catch(error => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message });
      });
  };
  render() {
    return (
      <div>
        <Toaster
          ref={element => {
            this.toaster = element;
          }}
        />
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="form-group">
          <button className="button" onClick={this.authWithEmailPassword}>
            Log In
          </button>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
