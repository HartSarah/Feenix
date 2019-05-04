import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Toaster, Intent } from "@blueprintjs/core";
import { fire, facebookProvider } from "../fire";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  authWithFacebook = () => {
    fire
      .auth()
      .signInWithPopup(facebookProvider)
      .then((user, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER,
            message: "Unable to sign in with Facebook"
          });
        } else {
          this.props.history.push("/CreateProfile");
        }
      });
  };
  authWithEmailPassword = () => {
    const { email, password } = this.state;

    fire
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.indexOf("password") === -1) {
          this.toaster.show({
            intent: Intent.WARNING,
            message: "User not found or password was incorrect"
          });
        } else {
          return fire.auth().signInWithEmailAndPassword(email, password);
        }
      })
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
        <button className="button" onClick={this.authWithFacebook}>
          Log In With Facebook
        </button>
      </div>
    );
  }
}
export default withRouter(Login);
