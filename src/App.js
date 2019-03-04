import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import CreateProfile from "./CreateProfile";
import EntertainerDashboard from "./EntertainerDashboard";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <Route path="" exact component={Home} />
          <Route path="/profile" component={CreateProfile} />
          <Route
            path="/EntertainerDashboard"
            component={EntertainerDashboard}
          />
        </>
      </BrowserRouter>
    );
  }
}

export default App;
