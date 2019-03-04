import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Login() {
  return (
    <div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Email" />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <Link to ="usersearch">
      <button className="btn btn-dark">Log In</button>
      </Link>
    </div>
  );
}
function Register() {
  return (
    <div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Email" />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>
      <Link to="profile">
        <button className="btn btn-dark">Sign Up</button>
      </Link>
    </div>
  );
}
class Home extends Component {
  state = { tab: "login" }; //needs state so I can navigate between tabs
  setTab(tab) {
    return () => this.setState({ tab });
  }
  render() {
    return (
      /*Creating tabs */
      <div className="container text-center login-container">
        <h1 className="login-header">Feenix</h1>
        <p className="app-decription text-muted">My App Description</p>
        <div className="login-dialog">
          <ul className="nav nav-tabs d-flex">
            <li className="nav-item flex-grow-1">
              <a
                // sets the state value on the class when clicked
                onClick={() => this.setState({ tab: "login" })}
                // add active class to the current selected tab
                className={
                  "nav-link " + (this.state.tab === "login" ? "active" : "")
                }
              >
                Login
              </a>
            </li>
            <li className="nav-item flex-grow-1">
              <a
                onClick={() => this.setState({ tab: "register" })}
                className={
                  "nav-link " + (this.state.tab === "register" ? "active" : "")
                }
              >
                Sign Up
              </a>
            </li>
          </ul>
          <div className="tab-content py-4 px-5">
            {/* render either the Login or the Register component depending on the current state of the Home Component */}
            {this.state.tab === "login" ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
