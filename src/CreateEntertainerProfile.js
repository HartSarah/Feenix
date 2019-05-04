import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import "./CreateEntertainerProfile.css";
import { fire } from './fire';

class CreateEntertainerProfile extends React.Component {
  constructor() {
    super();
    this.ref = fire.firestore().collection('/users');
    this.state = {
      userType: "entertainer",
      entertainerName:'',
      bio:'',
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
    this.props.history.push("/CreateProfile");
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { userType,bio,category,county,entertainerName } = this.state;
    console.log( userType,entertainerName,bio,category,county);
    this.ref.doc(fire.auth().currentUser.email).update({
      userType,
      entertainerName,
      bio,
      category,
      county
    }).then((docRef) => {
      this.setState({
      userType: "entertainer",
      entertainerName:'',
      bio:'',
      category:'',
      county:'',
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });


  }
  render() {
    return (
      <div className="container text-center search-container">
        <h1 className="header">Feenix</h1>
        <p className="text">
          Please choose from the drop down if you are a customer or an entertainer <br />
          Then create your profile
        </p>
        <div className="form-group">
          {/* changes the state of the class depending on which option is selected */}
          <select
            className="form-control"
            // value equals the current value of the userType
            //value={this.state.userType}
            // sets the state of the claas when the value changes
            onChange={this.onTypeChange}
          >
            <option value="entertainer">Entertainer</option>
            <option value="customer">Customer</option>
          </select>
        </div>
    
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" name="entertainerName" value={this.entertainerName} onChange={this.onChange} placeholder="Entertainer Name" />
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
      <div>
        <button className="button">Create Entertainer profile!</button>
      </div>
    </form>
      </div>
    );
}
}
export default CreateEntertainerProfile;
