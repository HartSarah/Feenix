import React from "react";
import "./UserSearch.css";
import { fire } from "./fire";
import { auth } from "firebase";
import { Link } from "react-router-dom";

/*This page allows the user to search the database and then book an entertainer
  The user can then book or favourite an entertainer found by the search. */

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
    //Query is built up based on user inputs to create a compund query.
    //All results filtered to return only entertainers.

    var query = this.ref.where("userType", "==", "entertainer");
    if (this.state.searchText != "") {
      query = query.where("surname", "==", this.state.searchText);
    }
    if (this.state.county !== "") {
      query = query.where("county", "==", this.state.county);
    }
    if (this.state.category !== "") {
      query = query.where("category", "==", this.state.category);
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
  //makeBooking function, called by a button in the modal.
  //first adds the booking to the users pending bookings, then adds it to
  //the selected enteratiners bookingRequests. 

  //function checks if date is enter and that the date is in the future.
  makeBooking = async () => {
    var curDate =  new Date(); //current date
    var inputDate = new Date(this.state.bookingDate); //date from user
    if(this.state.bookingDate != "" && inputDate > curDate){ //date check
      const user = fire.auth().currentUser.email;
      const users = fire.firestore().collection("/users");

      const entertainer = this.state.entertainerEmail; //entertainerEmail received form openModal function.

      const userData = await users.doc(user).get();
      //this code updates firebase with the new Pending booking object.
      await users.doc(user).update({
        pendingBookings: [
          ...(userData.data().pendingBookings || []),
          { entertainer, date: this.state.bookingDate }
        ]
      });
      //this updates the selected entertainers bookRequests data.
      const entertainerData = await users.doc(entertainer).get();
      await users.doc(entertainer).update({
        bookingRequests: [
          ...(entertainerData.data().bookingRequests || []),
          { user, date: this.state.bookingDate }
        ]
      });
      this.closeModal();
    }
    else{
      alert("Please enter a future date."); //error message
    }
  };

  //makeFavourite function, called by button in modal.
  makeFavourite = async () => {
    const user = fire.auth().currentUser.email;
    const users = fire.firestore().collection("/users");

    const entertainer = this.state.entertainerEmail;
    //updates the users firebase document and adds entertainers email address to users favourites.
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
  
  //when the button the open the Modal is pressed, the modalOpen state is set to true
  //and the page is then rendered. The modal will now be displayed.
  openModal = user =>
    this.setState({ modalOpen: true, entertainerEmail: user });
  closeModal = () => this.setState({ modalOpen: false }); //closes Modal by changing state and rerendering.
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
    } else if (this.state.searchResults === true) { //search has taken place and profile information needs to be displayed.
      return (
        <>
          {this.state.modalOpen ? ( //open viewprofile/booking/favorites/cancel modal if openModal (options) button is clicked.
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
                        required="required"></input>
                    </div>
                    <div class="modal-footer">
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
                          this.openModal(returnedProfile.data().userEmail) //email of the entertainer in the search results.
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
