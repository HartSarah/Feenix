import React from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./ProfileViewer.css";
import { fire } from './fire';

class ProfileViewer extends React.Component {
  constructor(props) {
    super();
    this.ref = fire.firestore().collection('users');
    this.state = {
      userProfile: true,
      userEmail: props.loginEmail,
      userType: '',
      firstName: '',
      surname:'',
      dob:'',
      bio:'',
      picture: '',
      age:'',
      category:'',
      county:'',
    };
  }

    componentDidMount()
  {
    var profileRef = this.ref.doc(this.state.userEmail);
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
          userType: ud.userType,
          firstName: ud.firstName,
          surname: ud.surname,
          dob:ud.dob,
          bio:ud.bio,
          picture: ud.picture,
          age:ud.age,
          category:ud.category,
          county:ud.county,
        });
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
  }

//seperate displays needed for customer and entertainer.
  render() {
    console.log(this.state.surname);
    if(this.state.userProfile === true){
      return (
        <>
          <div>
            <h2>{this.state.userType}</h2>
            <p>Name: {this.state.firstName} {this.state.surname} </p>
            <p>County: {this.state.county}</p>
            <p>D.O.B.: {this.state.age}</p>
            <p>Your Bio: {this.state.bio}</p>
            <p>{this.state.picture}</p>
          </div>
         </>
      );
    }
    else{
      return (
        <p>No user profile found! Create a profile by clicking "Create New Profile"</p>
        );
    }
  }
}
export default ProfileViewer;
