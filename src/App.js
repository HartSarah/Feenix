import React, { Component } from "react";
import "./App.css";
import Home from "./Home";
import CreateProfile from "./CreateProfile";
import Login from "./components/Login";
import Logout from "./components/Logout";
import EntertainerDashboard from "./EntertainerDashboard";
import UserSearch from "./UserSearch";
import SearchResults from "./SearchResults";
import ProfileViewer from "./ProfileViewer";

import { BrowserRouter, Route } from "react-router-dom";
import { Spinner } from '@blueprintjs/core';
import { fire } from './fire'


class App extends Component {
  constructor() {
    super();
   // this.setCurrentUser = this.setCurrentUser.bind(this);
    this.state = {
      authenticated: false,
      loading: true,
    };
  }

  //WHEN IN APP 
  componentWillMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false,
        })

      } else {
        this.setState({
          authenticated: false,
          loading: false, 
        })
      }
    })
  }
//WHEN YOU LEAVE APP
  componentWillUnmount(){
    this.removeAuthListener();
  }

 

  render() {
    if(this.state.loading === true){
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )

    }
    return (
    <BrowserRouter>
    <>
      <Route path="" exact component={Home} />
      <Route path="/profile" component={CreateProfile} />
      <Route path="/EntertainerDashboard" component={EntertainerDashboard}/>
      <Route path="/UserSearch" component={UserSearch} />
      <Route path="/SearchResults" component={SearchResults} />
      <Route path="/ProfileViewer" component={ProfileViewer} />
      <Route path="/Logout" exact component={Logout} />
      <Route path="/Login" exact component={Login} />
    </>
    </BrowserRouter>
    );
  }
}

export default App;
