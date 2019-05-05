import React from "react";
import { Redirect } from "react-router-dom";
import "./EditProfile.css";
import { fire } from "./fire";

class EditProfile extends React.Component {
  constructor(props) {
    super();
    this.ref = fire.firestore().collection("users");
    this.state = {
      userProfile: true,
      userEmail: props.loginEmail,
      userType: "",
      firstName: "",
      surname: "",
      dob: "",
      bio: "",
      picture: "",
      category: "",
      county: "",
      editComplete: false
    };
  }

  componentDidMount() {
    var profileRef = this.ref.doc(this.state.userEmail);
    var getDoc = profileRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
          const ud = doc.data();
          this.setState({
            userProfile: false
          });
        } else {
          console.log("Document data:", doc.data());
          const ud = doc.data();
          this.setState({
            userType: ud.userType,
            firstName: ud.firstName,
            surname: ud.surname,
            dob: ud.dob,
            bio: ud.bio,
            picture: ud.picture,
            category: ud.category,
            county: ud.county
          });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  setPicture = e => {
    var reader = new FileReader();

    reader.onload = () => {
      this.setState({ picture: reader.result });
    };

    reader.readAsDataURL(this.state.picture);
  };
  onSubmit = (e) => {
    e.preventDefault();

    const {
      userEmail,
      userType,
      firstName,
      surname,
      dob,
      bio,
      picture,
      category,
      county
    } = this.state;
    console.log(
      userEmail,
      userType,
      firstName,
      surname,
      dob,
      bio,
      picture,
      category,
      county
    );
    this.ref
      .doc(this.state.userEmail)
      .update({
        userEmail,
        userType,
        firstName,
        surname,
        dob,
        bio,
        picture,
        category,
        county
      })
      .then(docRef => {
        this.setState({
          userProfile: true,
          userType: "Customer",
          firstName: "",
          surname: "",
          dob: "",
          bio: "",
          picture: "",
          category: "",
          county: "",
          editComplete: true
        });

        //this.props.history.push("./UserNavigation/"+name);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    let displayedPage = null;
    if (
      this.state.userType === "customer" &&
      this.state.editComplete === false
    ) {
      displayedPage = (
        <div className="container text-center search-container">
          <p className="text">
            Please edit your profile here. Press "View Profile" to cancel edit.
          </p>
          <h3>{this.state.userType} Profile</h3>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={this.firstName}
                onChange={this.onChange}
                placeholder={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="surname"
                value={this.surname}
                onChange={this.onChange}
                placeholder={this.state.surname}
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                className="form-control"
                name="bio"
                value={this.bio}
                onChange={this.onChange}
                placeholder={this.state.bio}
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                placeholder="Profile Picture"
                name="picture"
                value={this.picture}
                onChange={this.setPicture}
                className="form-control"
              />
            </div>
            <div>
              <button className="button">Edit customer profile!</button>
            </div>
          </form>
        </div>
      );
    } else if (
      this.state.userType === "entertainer" &&
      this.state.editComplete === false
    ) {
      displayedPage = (
        <div className="container text-center search-container">
          <p className="text">
            Please edit your profile here. Press "View Profile" to cancel edit.
          </p>
          <h3>{this.state.userType} Profile</h3>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={this.firstName}
                onChange={this.onChange}
                placeholder={this.state.firstName}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="surname"
                value={this.surname}
                onChange={this.onChange}
                placeholder={this.state.surname}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="category"
                value={this.category}
                onChange={this.onChange}
              >
                {[this.state.category, "Comedy", "Kids", "Magic", "Music"]
                  // transforms the array of counties to an array of <option>county</option>
                  // this.state.category 
                  .map(category => (
                    <option>{category}</option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="county"
                value={this.county}
                onChange={this.onChange}
              >
                {[
                  this.state.county,
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
                name="bio"
                value={this.bio}
                onChange={this.onChange}
                placeholder={this.state.bio}
              />
            </div>
            <div className="form-group">
              <input
                type="file"
                placeholder="Profile Picture"
                name="picture"
                value={this.picture}
                onChange={this.setPicture}
                className="form-control"
              />
            </div>
            <div>
              <button className="button">Edit entertainer profile!</button>
            </div>
          </form>
        </div>
      );
    } else if (this.state.editComplete === true) {
      displayedPage = <Redirect to="/Profile" />;
    }

    return <>{displayedPage}</>;
  }
}
export default EditProfile;
