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
    this.authListener = this.authListener.bind(this);
    this.handleData = this.handleData.bind(this);
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
        userProfile: false,
        viewPage: "createprofile"
    })
  }

  displayEntertainerDashboard = () => {
    if (this.state.viewPage != "createprofile"){
      this.setState({
          viewPage: "entertainerdashboard"
      })
    }
  }

  displayEditProfile = () => {
    if (this.state.viewPage != "createprofile"){
      this.setState({
          viewPage: "editprofile"
      })
    }
  }

  displayUserSearch = () => {
    if (this.state.viewPage != "createprofile"){
      this.setState({
          viewPage: "usersearch"
      })
    }
  }

  displayProfileViewer = () => {
    if (true){
      console.log("profileviewer "+this.state.userProfile);
      this.setState({
          viewPage: "profileviewer"
      })
    }
  }

  handleData = (data) => {
    this.setState({
      userProfile: data
    });
    console.log("handleData"+this.state.userProfile);
  }
  
  deleteFunction = () => {
    if (this.state.viewPage != "createprofile"){
      var confirmation = window.confirm("Are you sure you want to delete your profile?");
      if (confirmation){
        var usercur = firebase.auth().currentUser;

        if (usercur) {
          console.log("delete if");
          var useremail = usercur.email;
          var profileRef = this.ref.doc(useremail);
          var deleteDoc = profileRef.delete();
        }
        this.setState({
          userProfile: false,
          viewPage: null
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
        <button className="difbutton" onClick={this.displayEditProfile}>Edit Profile</button>
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
          <CreateProfile loginEmail={useremail} handlerFromParent={this.handleData}/>
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

     else if ( this.state.viewPage === "editprofile" ) {
     displayedPage = (
     <div>
          <EditProfile loginEmail={useremail}/>
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
      </div>
      </>
    );
  }
}