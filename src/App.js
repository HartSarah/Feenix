import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import CreateProfile from "./CreateProfile";
import CreateEntertainerProfile from "./CreateEntertainerProfile";
import Logout from "./components/Logout";
import EntertainerDashboard from "./EntertainerDashboard";
import UserSearch from "./UserSearch";
import SearchResults from "./SearchResults";
import ProfileViewer from "./ProfileViewer";
import EditProfile from "./EditProfile";
import UserNavigation from "./UserNavigation";
import testCreate from "./testCreate";
import EnsureLogin from "./components/EnsureLogin";
import EnsureProfile from "./components/EnsureProfile";
import AppHeader from "./AppHeader";
import Account from "./Account";
import Bookings from "./Bookings";
import Favourites from "./favourites";
import { fire } from "./fire";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <div className="text-center text-danger">
            <h1 className="header">Feenix</h1>
            <p className="text">Book Entertainers that are local to you!</p>
          </div>
          <EnsureLogin>
            <EnsureProfile>
              <AppHeader />
              <Switch>
                {/* <Route path="/CreateProfile" component={CreateProfile} /> */}
                <Route
                  path="/CreateEntertainerProfile"
                  component={CreateEntertainerProfile}
                />
                <Route
                  path="/EntertainerDashboard"
                  component={EntertainerDashboard}
                />
                <Route path="/Search" component={UserSearch} />
                <Route path="/SearchResults" component={SearchResults} />
                <Route path="/Profile" component={ProfileViewer} />
                <Route path="/Logout" exact component={Logout} />
                <Route path="/UserNavigation" component={UserNavigation} />
                <Route path="/Account" component={Account} />
                <Route path="/Bookings" component={Bookings} />
                <Route path ="/Favourites" component={Favourites}/>
                <Route path="/EditProfile">
                  {() => (
                    <EditProfile loginEmail={fire.auth().currentUser.email} />
                  )}
                </Route>
                <Route path="/testCreate" component={testCreate} />
                <Route path="" component={() => <Redirect to="/Profile" />} />
              </Switch>
            </EnsureProfile>
          </EnsureLogin>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
