import React from "react";
import "./UserSearch.css";
import { fire } from "./fire";
import { auth } from "firebase";
import { Link } from "react-router-dom";

/*This page allows the user to search the database and then book an entertainer */

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
    var returnedProfiles = []; //variable to hold profiles found by the search

    //creates query based on user inputs.
    //Will search by surname if that field is filled in.
    //Other will search by county, category or both as appropriate.
    //All results filtered to return only entertainers.
    if (this.state.searchText != "") {
      var query = this.ref.where("surname", "==", this.state.searchText).where("userType", "==", "entertainer");
    } else if (this.state.county === "" && this.state.category === "") {
      var query = this.ref.where("userType", "==", "entertainer");
    } else if (this.state.category === "") {
      var query = this.ref.where("county", "==", this.state.county).where("userType", "==", "entertainer");
    } else if (this.state.county === "") {
      var query = this.ref.where("category", "==", this.state.category).where("userType", "==", "entertainer");
    } else {
      var query = this.ref
        .where("county", "==", this.state.county)
        .where("category", "==", this.state.category)
        .where("userType", "==", "entertainer");
    }

    //search the databse for profiles using the query created above.
    var query2 = query
      .get()
      .then(results => {
        if (results.empty) {
          console.log("No matching documents.");
          this.setState({
            searchResults: true
          }); //if there are no profiles found the searchResults state is set to true.
        }     //This true value will cause a "no profiles found" message to be displayed (in render() method).

        results.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          returnedProfiles.push(doc);
        });
        this.setState({
          searchResults: true,
          returnedProfiles: returnedProfiles
        }); //returnedProfiles state updated with found profiles. search results set to true. Page re-rendered.
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };
  //function to reset the page when the "new search button is pressed". searchResults set to false.
  newSearch = () => {
    console.log("new search");
    this.setState({
      searchResults: false,
      category: "",
      county: "",
      searchText: ""
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

  makeFavourite = async () => {
    const user = fire.auth().currentUser.email;
    const users = fire.firestore().collection("/users");

    //const firstName = this.state.firstName;
    // const category = this.state.category;
    // const county = this.state.county;
    const entertainer = this.state.entertainerEmail;

    const userData = await users.doc(user).get();
    await users.doc(user).update({
      favourites: [
        ...(userData.data().favourites || []),
        // { entertainer, email: this.state.entertainerEmail}
        { entertainer, date: this.state.bookingDate }
      ]
    });
    // const entertainerData = await users.doc(entertainer).get();
    // await users.doc(entertainer).update({
    //   bookingRequests: [
    //     ...(entertainerData.data().bookingRequests || []),
    //     { user, date: this.state.bookingDate }
    //   ]
    // });
    this.closeModal();
  };

  viewProfile = async () => {
    const users = fire.firestore().collection("/users");
    const entertainer = this.state.entertainerEmail;

    const userData = await users.doc(entertainer).get();
    
    return (
      <>
        <div>Test</div>
      </>
    )
  };

  openModal = user =>
    this.setState({ modalOpen: true, entertainerEmail: user });
  closeModal = () => this.setState({ modalOpen: false });
  render() {
    if ( //this case is when a search has taken place (searchResults == true) but no profiles were found in the database.
      this.state.searchResults === true &&
      this.state.returnedProfiles.length === 0
    ) {
      return (
        <div class="noResults">
          <p>No results found for this search!</p>
          <button className="difbutton" onClick={this.newSearch}>
            New Search
          </button>
        </div>
      );
    } else if (this.state.searchResults === true) { //search has taken place and profiles information needs to be displayed.
      return (
        <>
          {this.state.modalOpen ? ( //open booking/favorites/cancel modal if openModal (options) button is clicked.
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
                        required></input>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="button"
                        onClick={() => this.viewProfile()}
                      >
                        View Profile
                      </button>
                      <button
                        type="button"
                        class="button"
                        onClick={() => this.makeBooking()}
                      >
                        Book Now
                      </button>

                      {/* JPCode */}
                      <button
                        type="button"
                        class="favbutton"
                        onClick={() => this.makeFavourite()}
                      >
                        Add to Favourites
                      </button>
                      {/* JPCode */}

                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={this.closeModal}
                      >
                        Cancel
                      </button>


                    </div>
                  </div>
                </div>
              </div>

              {/*  */}
              {/*  */}




              {/*  */}
              {/*  */}

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
                        //button to open modal. The relevent entertainer email is passed to the openModal method.
                        className="button"
                        onClick={() =>
                          this.openModal(returnedProfile.data().userEmail)
                        }
                      >
                        Options
                      </button>

                      {/* JPCode */}
                      {/* <div class="divider" />
                      <button
                        className="favbutton"
                        onClick={() => 
                          this.makeFavourite()
                        }
                      >
                        Add to Favourites
                      </button> */}
                      {/* JPCode */}
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
    } else { //no search has taken place. Search input boxes are displayed.
      return (
        <form onSubmit={this.searchDB}>
          <div className="container text-center search-container">
            <p className="text">
              Enter the surname of the entertainer and press search.
              Or you can you can use the filters to find the right type of entertainer in your area!!
            </p>
            <div className="search-box">
              <div className="tab-content py-4 px-5">
                <div className="form-group">
                  <input
                    type="search"
                    placeholder="Search by surname"
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
