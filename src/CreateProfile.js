import React from "react";
import { Link } from "react-router-dom";
import "./CreateProfile.css";

export default class CreateProfile extends React.Component {
  state = { userType: "customer" };
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
            value={this.state.userType}
            // sets the state of the claas when the value changes
            onChange={e => this.setState({ userType: e.target.value })}
          >
            <option value="customer">Customer</option>
            <option value="entertainer">Entertainer</option>
          </select>
        </div>
        {/* renders either the cutomer form or the entertainer form depending on the userType state */}
        {this.state.userType === "customer" ? <Customer /> : <Entertainer />}
      </div>
    );
  }
}

function Customer() {
  return (
    <>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="First Name" />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Surname" />
      </div>
      <div className="form-group">
        <input type="date" className="form-control" placeholder="Age" />
      </div>
      <div className="form-group">
        <textarea type="text" className="form-control" placeholder="Bio" />
      </div>
      <div className="form-group">
        <input
          type="file"
          placeholder="Profile Picture"
          className="form-control"
        />
      </div>
      <button className="button">Create customer profile!</button>
    </>
  );
}
function Entertainer() {
  return (
    <>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Name" />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Age" />
      </div>

      <div className="form-group">
        <select className="form-control" placeholder="Category">
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
        <select className="form-control" placeholder="County">
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
        <textarea type="text" className="form-control" placeholder="Bio" />
      </div>
      <div className="form-group">
        <input
          type="file"
          placeholder="Profile Picture"
          className="form-control"
        />
      </div>
      {/* tells the browser router to change the route to EntertainerDashboard */}
      <Link to="/EntertainerDashboard">
        <button className="button">Create entertainer profile!</button>
      </Link>
    </>
  );
}
