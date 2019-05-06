import React, { Component } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Spinner } from "@blueprintjs/core";
import { fire } from "../fire";
import { Switch, Route, Redirect } from "react-router-dom";
import CreateProfile from "../CreateProfile";

export const UserProfileContext = React.createContext();
export default class EnsureProfile extends Component {
  state = {
    loading: true
  };
  /*getting information in firebase by user email key. and checking if there is data present for that key. Changes loading to false when response is received.*/
  componentDidMount() {
    this.subscription = fire
      .firestore()
      .collection("users")
      .doc(fire.auth().currentUser.email)
      .onSnapshot(snap =>
        this.setState({ loading: false, profile: snap.data() })
      );
  }
  /**
   * removes subscription when component Removed from DOM
   */
  componentWillUnmount = () => {
    this.subscription();
  };

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
    if (this.state.profile) {
      //checks if profile exists.
      return (
        //makes the profile globally accessible
        <UserProfileContext.Provider value={this.state.profile}>
          {this.props.children /*renders rest of app*/}
        </UserProfileContext.Provider>
      );
    } else {
      //otherwise return to the create profile page.
      return (
        <Switch>
          <Route path="/CreateProfile" component={CreateProfile} />
          <Route>{() => <Redirect to="/CreateProfile" />}</Route>
        </Switch>
      );
    }
  }
}
