import React from "react";
import "./CreateProfile.css";
import { fire } from "./fire";

export default class CreateProfile extends React.Component {
  state = {
    userType: "customer",
    userEmail: fire.auth().currentUser.email,
    firstName: "",
    surname: "",
    dob: "",
    bio: "",
    picture: "",
    age: "",
    category: "",
    county: ""
  };
  storeUser = user => {
    fire
      .firestore()
      .collection("users")
      .doc(user.userEmail)
      .set(user)
      .then(()=>this.props.setProfile(user))
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };
  onSubmit = () => {
    if (this.state.picture) {
      var reader = new FileReader();

      reader.onload = () => {
        this.storeUser({ ...this.state, picture: reader.result });
      };

      reader.readAsDataURL(this.state.picture);
    } else {
      this.storeUser(this.state);
    }
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  setPicture = e => {
    this.setState({ picture: e.target.files[0] });
  };
  render() {
    return (
      <div className="container pt-5 text-center">
        <h1>Create Profile</h1>
        <div className="form-group">
          {/* changes the state of the class depending on which option is selected */}
          <select
            className="form-control"
            // value equals the current value of the userType
            value={this.state.userType}
            // sets the state of the claas when the value changes
            onChange={e => this.setState({ userType: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="entertainer">Entertainer</option>
          </select>
        </div>
        {/* renders either the cutomer form or the entertainer form depending on the userType state */}
        {this.state.userType === "customer" ? (
          <Customer
            submit={this.onSubmit}
            onChange={this.onChange}
            setPicture={this.setPicture}
            {...this.state}
          />
        ) : (
          <Entertainer
            submit={this.onSubmit}
            onChange={this.onChange}
            {...this.state}
          />
        )}
      </div>
    );
  }
}

function Customer({
  submit,
  setPicture,
  onChange,
  firstName,
  surname,
  dob,
  bio
}) {
  return (
    <>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          name="firstName"
          value={firstName}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Surname"
          value={surname}
          name="surname"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="date"
          className="form-control"
          placeholder="Age"
          value={dob}
          name="dob"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <textarea
          type="text"
          className="form-control"
          placeholder="Bio"
          value={bio}
          name="bio"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          placeholder="Profile Picture"
          className="form-control"
          name="picture"
          onChange={setPicture}
        />
      </div>
      <button className="button" onClick={submit}>
        Sign Up as Customer!
      </button>
    </>
  );
}
function Entertainer({
  submit,
  setPicture,
  onChange,
  firstName,
  surname,
  age,
  category,
  county,
  bio
}) {
  return (
    <>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          value={firstName}
          name="firstName"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Surname"
          value={surname}
          name="surname"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="Age"
          value={age}
          name="age"
          onChange={onChange}
        />
      </div>
      <select
        className="form-control"
        name="category"
        value={category}
        onChange={onChange}
        placeholder="Category"
      >
        {["Category", "Comedy", "Kids", "Magic", "Music"].map(category => (
          <option>{category}</option>
        ))}
      </select>
      <p></p>
      <div className="form-group">
        <select
          className="form-control"
          placeholder="County"
          value={county}
          name="county"
          onChange={onChange}
        >
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
        <textarea
          type="text"
          className="form-control"
          placeholder="Bio"
          value={bio}
          name="bio"
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <input
          type="file"
          placeholder="Profile Picture"
          className="form-control"
          name="picture"
          onChange={setPicture}
        />
      </div>
      {/* tells the browser router to change the route to EntertainerDashboard */}
      <button className="button" onClick={submit}>
        Sign Up as Entertainer!
      </button>
    </>
  );
}
