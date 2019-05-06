import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./AppHeader.css";
import { UserProfileContext } from "./components/EnsureProfile";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

export default class AppHeader extends Component {
  state = { navOpen: false };
  render() {
    return (
      <UserProfileContext.Consumer>
        {profile => (
          <div className="appHeader">
            <div
              className="menuToggle"
              onClick={() =>
                this.setState(state => ({ navOpen: !state.navOpen }))
              }
            >
              {profile.picture ? (//checks if user has a profile picture, if not displays a user icon.
                <img src={profile.picture} className="profileImg" />
              ) : (
                <div className="fa fa-user" />
              )}

              {this.state.navOpen ? ( //if navigation has been clicked open the menu.
                <div className="menuBody">
                  <NavLink to="/Profile">Profile</NavLink>
                  <NavLink to="/Bookings">Bookings</NavLink>
                  <NavLink to="/Favourites">Favourites</NavLink>
                  <NavLink to="/Account">Account</NavLink>
                  <NavLink to="/Logout">Logout</NavLink>
                </div>
              ) : null}
            </div>
            <div className="becomeEntertainerButton">
              {profile.userType == "customer" ? (
                <Link to="CreateEntertainerProfile">Become an Entertainer</Link>
              ) : (
                <Link to="EntertainerDashboard">Entertainer Dashboard</Link>
              )}
            </div>
            <div className="flex-grow-1" />
            <div className="searchButton">
              <NavLink to="/Search">Search</NavLink>
            </div>
          </div>
        )}
      </UserProfileContext.Consumer>
    );
  }
}
