import React, { Component } from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import "./LoginSignup.css";

class LoginSignup extends Component {
  render() {
    return (
      /*Creating tabs */
      <div className="container text-center login-container">
        <div className="">
          <ul className="nav nav-tabs d-flex">
            <li className="nav-item flex-grow-1">
              <NavLink className="nav-link" to="/Login">
                Login
              </NavLink>
            </li>
            <li className="nav-item flex-grow-1">
              <NavLink className="nav-link" to="/SignUp">
                Sign Up
              </NavLink>
            </li>
          </ul>
          <div className="tab-content py-4 px-5">
            {/* render either the Login or the Register component depending on the current state of the Home Component */}
            <Switch>
              <Route path="/Login" component={Login} />
              <Route path="/SignUp" component={Signup} />
              <Route path="" component={() => <Redirect to="Login" />} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSignup;
