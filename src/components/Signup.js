import React, { Component } from "react";
import { fire } from "../fire";
import { Toaster, Intent } from "@blueprintjs/core";

export default class Signup extends Component {
  state = { email: "", password: "" };
  authWithEmailPassword = () => {
    const { email, password } = this.state;
    fire
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length === 0) {
          //create user new user
          return fire.auth().createUserWithEmailAndPassword(email, password);
        }
      })
      .catch(error => {
        this.toaster.show({
          intent: Intent.DANGER,
          message: error.message
        });
      });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
        </div>
        <button className="button" onClick={this.authWithEmailPassword}>
          Sign Up
        </button>
      </div>
    );
  }
}
