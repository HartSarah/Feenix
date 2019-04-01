import React from "react";
import "./UserNavigation.css";
import { Link } from "react-router-dom";

export default class UserNavigation extends React.Component {
    state = { };
    render() {
      return (
        <div className="container text-center usernav-box">
        <h1 className="header">Feenix</h1>
        <p className="app-description text-muted">My App Description</p>
        <div className="button-container">
        <div className="tab-content py-4 px-5">
        
      </div>
      <Link to="EntertainerDashboard">
        <button className="button">Entertainer Dashboard</button>
      </Link>
      
      <div>
      <Link to="UserSearch">
        <button className="button">User Search</button>
      </Link>
      </div>
      <div>
      <Link to="CreateProfile">
        <button className="button">Create Profile Page</button>
      </Link>
      </div>
      <div>
      <Link to="ProfileViewer">
        <button className="button">Profile Viewer Page</button>
      </Link>
      </div>
      <div>
      <Link to="Signup">
        <button className="button">Sign Up Page</button>
      </Link>
      </div>
      </div>
      </div>
      );
    }
}