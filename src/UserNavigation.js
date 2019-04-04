import React from "react";
import "./UserNavigation.css";
import { Link } from "react-router-dom";

export default class UserNavigation extends React.Component {
  state = {};
  render() {
    return (
      <div className="container text-center usernav-box">
        <h1 className="header">Feenix</h1>
        <p className="text">
          Developers way to navigate through the pages easily
        </p>

        <div className="button-container">
          <Link to="Signup">
            <button className="difbutton">Sign Up Page</button>
          </Link>

          <Link to="Login">
            <button className="difbutton">Login Page</button>
          </Link>

          <p></p>

          <Link to="UserSearch">
            <button className="difbutton">User Search</button>
          </Link>

          <Link to="EntertainerDashboard">
            <button className="difbutton">Entertainer Dashboard</button>
          </Link>
          
          <p></p>

          <Link to="CreateProfile">
            <button className="difbutton">Create Profile Page</button>
          </Link>

          <Link to="ProfileViewer">
            <button className="difbutton">Profile Viewer Page</button>
          </Link>
        </div>
        <p></p>
      </div>
    );
  }
}