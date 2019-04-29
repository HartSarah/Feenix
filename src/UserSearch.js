import React from "react";
import "./UserSearch.css";
import { fire } from "./fire";
import { auth } from "firebase";

class UserSearch extends React.Component {
  constructor() {
    super();
    this.ref = fire.firestore().collection("users");
    this.state = {
      modalOpen: false,
      bookingDate: "",
      searchResults: false,
      searchText: "",
      category: "",
      county: "",
      returnedProfiles: []
    };
  }

  onChange = e => {
    console.log("onchange");
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  searchDB = e => {
    e.preventDefault();
    var returnedProfiles = [];
    console.log("searchDB" + this.state.county);
    if (this.state.county === "" && this.state.category === "") {
      var query = this.ref;
    } else if (this.state.category === "") {
      var query = this.ref.where("county", "==", this.state.county);
    } else if (this.state.county === "") {
      var query = this.ref.where("category", "==", this.state.category);
    } else {
      var query = this.ref
        .where("county", "==", this.state.county)
        .where("category", "==", this.state.category);
    }
    var query2 = query
      .get()
      .then(results => {
        if (results.empty) {
          console.log("No matching documents.");
          this.setState({
            searchResults: true
          });
        }

        results.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          returnedProfiles.push(doc);
        });
        this.setState({
          searchResults: true,
          returnedProfiles: returnedProfiles
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  newSearch = () => {
    console.log("new search");
    this.setState({
      searchResults: false,
      category: "",
      county: ""
    });
  };
  makeBooking = async () => {
    const user = fire.auth().currentUser.email;
    const users = fire.firestore().collection("/users");

    const entertainer = this.state.entertainerEmail;

    const userData = await users.doc(user).get();
    await users.doc(user).update({
      pendingBookings: [
        ...(userData.data().pendingBookings || []),
        { entertainer, date: this.state.bookingDate }
      ]
    });
    const entertainerData = await users.doc(entertainer).get();
    await users.doc(entertainer).update({
      bookingRequests: [
        ...(entertainerData.data().bookingRequests || []),
        { user, date: this.state.bookingDate }
      ]
    });
    this.closeModal();
  };
  openModal = user =>
    this.setState({ modalOpen: true, entertainerEmail: user });
  closeModal = () => this.setState({ modalOpen: false });
  render() {
    if (
      this.state.searchResults === true &&
      this.state.returnedProfiles.length === 0
    ) {
      return (
        <div>
          <p>No results found for this search!</p>
          <button className="difbutton" onClick={this.newSearch}>
            New Search
          </button>
        </div>
      );
    } else if (this.state.searchResults === true) {
      return (
        <>
          {this.state.modalOpen ? (
            <>
              <div class="modal d-block" tabIndex="-1" role="dialog">
                <div class="modal-dialog d-block" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Booking</h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={this.closeModal}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <input
                        type="date"
                        value={this.state.bookingDate}
                        onChange={e =>
                          this.setState({ bookingDate: e.target.value })
                        }
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="button"
                        onClick={() => this.makeBooking()}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-backdrop show" />
            </>
          ) : null}
          <div className="container">
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>County</th>
                </tr>
              </thead>
              <tbody>
                {this.state.returnedProfiles.map(returnedProfile => (
                  <tr>
                    <td>
                      {returnedProfile.data().firstName}{" "}
                      {returnedProfile.data().surname}
                    </td>
                    <td>{returnedProfile.data().category}</td>
                    <td>{returnedProfile.data().county}</td>
                    <td>
                      <button
                        className="button"
                        onClick={() =>
                          this.openModal(returnedProfile.data().userEmail)
                        }
                      >
                        Book Now
                      </button>
                    </td>
                    <td />
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {/*
            <td><Link to={`/show/${returnedProfiles.key}`}>{returnedProfiles.title}</Link></td>


            <h2>{this.state.userType}</h2>
            <p>Name: {this.state.firstName} {this.state.surname} </p>
            <p>County: {this.state.county}</p>
            <p>D.O.B.: {this.state.age}</p>
            <p>Your Bio: {this.state.bio}</p>
            <p>{this.state.picture}</p> */}
            </div>
            <button className="difbutton" onClick={this.newSearch}>
              New Search
            </button>
          </div>
        </>
      );
    } else {
      return (
        <form onSubmit={this.searchDB}>
          <div className="container text-center search-container">
            <p className="text">
              Use the below form to search for an entertainer
            </p>
            <div className="search-box">
              <div className="tab-content py-4 px-5">
                <div className="form-group">
                  <input
                    type="search"
                    placeholder="Search by name"
                    className="form-control"
                    name="searchText"
                    value={this.searchText}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <select
                    className="form-control"
                    placeholder="County"
                    name="county"
                    value={this.county}
                    onChange={this.onChange}
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
                  <select
                    className="form-control"
                    name="category"
                    placeholder="Category"
                    value={this.category}
                    onChange={this.onChange}
                  >
                    {["Category", "Comedy", "Kids", "Magic", "Music"]
                      // transforms the array of counties to an array of <option>county</option>
                      .map(category => (
                        <option>{category}</option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <button className="difbutton">Search</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      );
    }
  }
}
export default UserSearch;
