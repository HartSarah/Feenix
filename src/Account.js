import React from "react";
import { fire } from "./fire";
import { NavLink } from "react-router-dom";
import { UserProfileContext } from "./components/EnsureProfile";
import { Link } from "react-router-dom";
import "./Account.css";

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
            <div class="buttonMenu">
              <p>
                <button
                  className="button"
                  onClick={() => this.deleteProfile(context)}
                >
                  Delete your account
            </button>
              </p>
              <p>
                <Link class="button" to="/EditProfile">Edit Profile</Link>
              </p>
            </div>
          </>
        )}
      </UserProfileContext.Consumer>
    );
  }
}
