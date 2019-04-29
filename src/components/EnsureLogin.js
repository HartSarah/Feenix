import React, { Component } from "react";
import LoginSignup from "./LoginSignup";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Spinner } from "@blueprintjs/core";
import { fire } from "../fire";

class EnsureLogin extends Component {
  state = {
    authenticated: false,
    loading: true
  };
  componentDidMount() {
    this.removeAuthListener = fire
      .auth()
      .onAuthStateChanged(user =>
        this.setState(() => ({ loading: false, authenticated: !!user }))
      );
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  render() {
    if (this.state.loading === true) {
      return (
        <div
          style={{
            textAlign: "center",
            marginTop: "25%"
          }}
        >
          <h3>Loading</h3>
          <Spinner />
        </div>
      );
    }
    if (this.state.authenticated) return this.props.children;
    return <LoginSignup />;
  }
}

export default EnsureLogin;
