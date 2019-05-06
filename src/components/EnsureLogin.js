import React, { Component } from "react";
import LoginSignup from "./LoginSignup";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Spinner } from "@blueprintjs/core";
import { fire } from "../fire";

class EnsureLogin extends Component {
  state = {
    //initial states of this component
    authenticated: false, //not authenticated
    loading: true //no credentials
  };
  /** fires off when react first renders this component on the page
   * Creates an event listener on the firebase auth, and updates the values of the states when the component loads
  */
  componentDidMount() {
    this.removeAuthListener = fire
      .auth()
      .onAuthStateChanged(user =>
        this.setState({ loading: false, authenticated: !!user /*!! converts user to boolean (for if statement later)(if user is not there it will be undefined so it will be false. */})
      );
  }
  /**
   * Removes the event listener when the component is taken out of page
   */
  componentWillUnmount() {
    this.removeAuthListener();
  }

  render() {
    //if app still hasn't received user credentials display a spinner.
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
    //if authenticated display rest of app
    if (this.state.authenticated) {
      return this.props.children;
    } 
    //otherwise bring to login/signup page
    else {
      return <LoginSignup />;
    }
  }
}

export default EnsureLogin;
