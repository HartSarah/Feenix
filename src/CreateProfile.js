import React from "react";
import { Link } from "react-router-dom";
import "./CreateProfile.css";
import { fire } from './fire';

class CreateProfile extends React.Component {
  constructor(props) {
    super();
    this.ref = fire.firestore().collection('users');
    this.state = {
      userProfile: false,
      userEmail: props.loginEmail,
      userType: "customer",
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
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onTypeChange = (e) => {
    //this.props.history.push("./CreateEntertainerProfile");
    var tempTypeVar = this.state.userType;
    if (tempTypeVar == "entertainer"){
      tempTypeVar = "customer";
    }
    else{
      tempTypeVar = "entertainer";
    }
    this.setState({
      userType: tempTypeVar
    });
    console.log(this.state.userType);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { userEmail,userType,firstName,surname,dob,bio,picture,age,category,county } = this.state;
    const name = firstName;
    console.log( userEmail,userType,firstName,surname,dob,bio,picture,age,category,county);
    this.ref.doc(this.state.userEmail).set({
      userEmail,
      userType,
      firstName,
      surname,
      dob,
      bio,
      picture,
      age,
      category,
      county
    }).then((docRef) => {
      this.setState({
      userProfile: true,
      userType: "customer",
      firstName: '',
      surname:'',
      dob:'',
      bio:'',
      picture: '',
      age:'',
      category:'',
      county:'',
      });

      //this.props.history.push("./UserNavigation/"+name);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  render() {
    let displayedPage = null;
    let options = null;
    //console.log("render"+this.state.userType);
    if (this.state.userProfile === false) {
      options = (
        <div className="container text-center search-container">
        <p className="text">
          Please choose from the drop down if you are a customer or an entertainer <br />
          Then create your profile.</p>
        <div className="form-group">
          {/* changes the state of the class depending on which option is selected */}
          <select
            className="form-control"
            // value equals the current value of the userType
            //value={this.state.userType}
            // sets the state of the claas when the value changes
            onChange={this.onTypeChange}
          >
            <option value="customer">Customer</option>
            <option value="entertainer">Entertainer</option>
          </select>
        </div>
        </div>
        );
    }
    if (this.state.userProfile === true) {
      displayedPage = (
        <p>Profile created!</p>
        );
    }
    else if ( this.state.userType === "customer" ) {
     displayedPage = (
     <div>
      <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" name="firstName" value={this.firstName} onChange={this.onChange} placeholder="First Name" />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="surname" value={this.surname} onChange={this.onChange} placeholder="Surname" />
      </div>
      <div className="form-group">
        <input type="date" className="form-control" name="age" value={this.age} onChange={this.onChange} placeholder="Age" />
      </div>
      <div className="form-group">
        <textarea type="text" className="form-control" name="bio" value={this.bio} onChange={this.onChange} placeholder="Bio" />
      </div>
      <div className="form-group">
        <input
          type="file"
          placeholder="Profile Picture" name="picture" value={this.picture} onChange={this.onChange}
          className="form-control"
        />
      </div>
      <div>
      <button className="button">Create customer profile!</button>
      </div>
    </form>
      </div>
     )
    }

    else if ( this.state.userType == "entertainer" ) {
     displayedPage = (
     <div>
      <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" name="firstName" value={this.firstName} onChange={this.onChange} placeholder="First Name" />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="surname" value={this.surname} onChange={this.onChange} placeholder="Surname" />
      </div>
      <div className="form-group">
        <input type="date" className="form-control" name="age" value={this.age} onChange={this.onChange} placeholder="Age" />
      </div>
            <div className="form-group">
        <select className="form-control" name="category" value={this.catagory} onChange={this.onChange} placeholder="Category">
          {[
            "Category",
            "Comedy",
            "Kids",
            "Magic",
            "Music",
          ]
            // transforms the array of counties to an array of <option>county</option>
            .map(category => (
              <option>{category}</option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <select className="form-control" name="county" value={this.county} onChange={this.onChange}  placeholder="County">
          {[
            "County",
            "Antrim",
            "Armagh",
            "Carlow",
            "Cavan",
            "Clare",
            "Cork",
            "Derry",
            "Donegal",
            "Down",
            "Dublin",
            "Fermanagh",
            "Galway",
            "Kerry",
            "Kildare",
            "Kilkenny",
            "Laois",
            "Leitrim",
            "Limerick",
            "Longford",
            "Louth",
            "Mayo",
            "Meath",
            "Monaghan",
            "Offaly",
            "Roscommon",
            "Sligo",
            "Tipperary",
            "Tyrone",
            "Waterford",
            "Westmeath",
            "Wexford",
            "Wicklow"
          ]
            // transforms the array of counties to an array of <option>county</option>
            .map(county => (
              <option>{county}</option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <textarea type="text" className="form-control" name="bio" value={this.bio} onChange={this.onChange} placeholder="Bio" />
      </div>
      <div className="form-group">
        <input
          type="file"
          placeholder="Profile Picture" name="picture" value={this.picture} onChange={this.onChange}
          className="form-control"
        />
      </div>
      <div>
        <button className="button">Create Entertainer profile!</button>
      </div>
    </form>
      </div>
     )
    }
    return (
      <>
        <div>
        {options}
        </div>
        <div>
        {displayedPage}
        </div>
        </>
    );
}
}
export default CreateProfile;