import React from "react";
import "./UserNavigation.css";
import { Link } from "react-router-dom";
import 'firebase/auth';
import * as firebase from 'firebase/app';
import ProfileViewer from "./ProfileViewer";
import EditProfile from "./EditProfile";
import CreateProfile from "./CreateProfile";
import EntertainerDashboard from "./EntertainerDashboard";
import UserSearch from "./UserSearch";
import { fire } from './fire';

export default class UserNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.ref = fire.firestore().collection('users');
    this.state = {
      authStatus: "not logged in",
      viewPage: "none",
      userProfile: false,
      userEmail: ""
    }
    this.authListener = this.authListener.bind(this)
  }

  authListener()
  {
    var usercur = firebase.auth().currentUser;

     if (usercur) {
       console.log("truecur");
       var useremail = usercur.email;
       var profileRef = this.ref.doc(useremail);
       var getDoc = profileRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        const ud = doc.data();
        this.setState({
          userProfile: false,
        });
      } else {
        console.log('Document data:', doc.data());
        const ud = doc.data();
        this.setState({
          userProfile: true,
        });
        console.log(this.state.userProfile);
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
    console.log(this.state.userProfile);
       this.setState({
          authStatus:"Logged in as: "+useremail,
          userEmail: useremail,
        });
  // User is signed in.
     } else {
       console.log("falsecur");
  // No user is signed in.
     }
  }

  componentDidMount()
  {
    this.authListener();  
  }

  displayCreateProfile = () => {
    this.setState({
        viewPage: "createprofile"
    })
}

  displayEntertainerDashboard = () => {
    this.setState({
        viewPage: "entertainerdashboard"
    })
}

  displayUserSearch = () => {
    this.setState({
        viewPage: "usersearch"
    })
}

  displayProfileViewer = () => {
    this.setState({
        viewPage: "profileviewer"
    })
}
  
  deleteFunction = () => {
    var confirmation = window.confirm("Are you sure you want to delete your profile?");
    if (confirmation){
      var usercur = firebase.auth().currentUser;

      if (usercur) {
        console.log("delete if");
        var useremail = usercur.email;
        var profileRef = this.ref.doc(useremail);
        var deleteDoc = profileRef.delete();
        this.setState({
          userProfile: false,
        });
      }
    }
  }

  render() {
    let displayedPage = null;
    const useremail = firebase.auth().currentUser.email;
    let createedit = null;
    let deletebutton = null;
    if ( this.state.userProfile === true ) {
      createedit = (
        <button className="difbutton" onClick={this.displayCreateProfile}>Edit Profile</button>
     );
      deletebutton = (
        <button className="difbutton" onClick={this.deleteFunction}>Delete Your Profile</button>
        )
    }

    else if ( this.state.userProfile === false ) {
      createedit = (
        <button className="difbutton" onClick={this.displayCreateProfile}>Create New Profile</button>
     )
      deletebutton = (
        null
        )
    }

    if ( this.state.viewPage === "createprofile" ) {
     displayedPage = (
     <div>
          <CreateProfile loginEmail={useremail}/>
     </div>
     )
    }

    else if ( this.state.viewPage === "entertainerdashboard" ) {
     displayedPage = (
     <div>
          <EntertainerDashboard />
     </div>
     )
    }

    else if ( this.state.viewPage === "usersearch" ) {
     displayedPage = (
     <div>
          <UserSearch />
     </div>
     )
    }

    else if ( this.state.viewPage === "profileviewer" ) {
     displayedPage = (
     <div>
          <ProfileViewer loginEmail={useremail}/>
     </div>
     )
    }

    return (
      <> 
      <div className="container text-center usernav-box">
        <h1 className="header">Feenix</h1>
        <div>{this.state.authStatus}</div>
        <div>{this.state.userProfile}</div>
        {createedit}
        <button className="difbutton" onClick={this.displayEntertainerDashboard}>Entertainer Dashboard</button>
        <button className="difbutton" onClick={this.displayUserSearch}>User Search</button>
        <button className="difbutton" onClick={this.displayProfileViewer}>View Profile</button>
        {deletebutton}
        <hr style={{
            color: "red",
            backgroundColor: "red",
            height: 5
        }}/>
        {displayedPage}
        {/*
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

          <Link to="EditProfile">
            <button className="difbutton">Edit Profile Page</button>
          </Link>

          <Link to="CreateEntertainerProfile">
            <button className="difbutton">Create Entertainer Page</button>
          </Link>

          <Link to="testCreate">
            <button className="difbutton">Test Create Page</button>
          </Link>
        </div>
        <p></p>*/}
      </div>
      </>
    );
  }
}