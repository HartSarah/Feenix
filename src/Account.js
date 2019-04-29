import React from "react";
import { fire } from "./fire";
import { UserProfileContext } from "./components/EnsureProfile";
import { Link } from "react-router-dom";

export default class Account extends React.Component {
  deleteProfile({ userEmail }) {
    var confirmation = window.confirm(
      "Are you sure you want to delete your profile?"
    );
    if (confirmation) {
      fire
        .firestore()
        .collection("users")
        .doc(userEmail)
        .delete()
        .then(() => fire.auth().signOut());
    }
  }
  render() {
    return (
      <UserProfileContext.Consumer>
        {context => (
          <>
            <button
              className="button"
              onClick={() => this.deleteProfile(context)}
            >
              Delete your account
            </button>
            <button className="button">
              <Link to="/EditProfile">Edit Profile</Link>
            </button>
          </>
        )}
      </UserProfileContext.Consumer>
    );
  }
}
