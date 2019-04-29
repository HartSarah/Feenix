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
  componentDidMount() {
    this.subscription = fire
      .firestore()
      .collection("users")
      .doc(fire.auth().currentUser.email)
      .onSnapshot(snap => {
        this.setState(() => ({ loading: false, profile: snap.data() }));
      });
  }
  componentWillUnmount = () => {
    this.subscription();
  };
  setProfile = profile => this.setState({ profile });
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
    if (this.state.profile)
      return (
        <UserProfileContext.Provider
          value={{ setProfile: this.setProfile, ...this.state.profile }}
        >
          {this.props.children}
        </UserProfileContext.Provider>
      );
    return (
      <Switch>
        <Route path="/CreateProfile">
          <CreateProfile setProfile={this.setProfile} />
        </Route>
        <Route>{() => <Redirect to="/CreateProfile" />}</Route>
      </Switch>
    );
  }
}
