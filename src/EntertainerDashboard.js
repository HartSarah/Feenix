import React from "react";
import "react-dates/initialize";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./EntertainerDashboard.css";
import { UserProfileContext } from "./components/EnsureProfile";
import { fire } from "./fire";

export default class ProfileViewer extends React.Component {
  async acceptBooking(index) { //parameter is the index of the accepted booking
    const currentUser = fire.auth().currentUser.email;
    const users = fire.firestore().collection("/users");

    const userRef = await users.doc(currentUser).get(); //reference to user data
    const user = userRef.data();

    let accepted; 
    const filteredRequests = [];
    for (let i = 0; i < (user.bookingRequests || []).length; i++) {
      if (i === index) {
        accepted = user.bookingRequests[i]; //accepted holds the request
      } else {
        filteredRequests.push(user.bookingRequests[i]); //make a new array of those not accepted
      }
    }

    await users.doc(currentUser).update({ //updating current user 
      confirmedRequests: [...(user.confirmedRequests || []), accepted], //uses array spread to add accepted into previously made confirmed array
      bookingRequests: filteredRequests //booking requests now takes on only requests in filtered.
    });

    const customerRef = await users.doc(accepted.user).get(); //gets customer data from accepted object.
    const customer = customerRef.data();

    /**
     * Now changes customer's pending bookings to either confirmed, or deletes them.
     */
    let userBooking;
    const filteredPending = [];
    for (let i = 0; i < (customer.pendingBookings || []).length; i++) {
      const booking = customer.pendingBookings[i];

      if ( //ensures that the firebase is deleting the correct booking as there is no Pkey. takes the first instance of this booking.
        booking.entertainer === currentUser &&
        booking.date === accepted.date &&
        !userBooking
      ) {
        userBooking = booking; //stores user booking
      } else {
        filteredPending.push(booking); //otherwise push booking onto filtered array
      }
    }
    /**updates pending bookings and confirmed bookings, addes userBooking to confirmed */
    users.doc(accepted.user).update({
      pendingBookings: filteredPending,
      confirmedBookings: [...(customer.confirmedBookings || []), userBooking]
    });
  }
  /**Denys */
  async denyBooking(index) {
    const currentUser = fire.auth().currentUser.email;
    const users = fire.firestore().collection("/users");

    const userRef = await users.doc(currentUser).get();
    const user = userRef.data();

    let denied;
    const filteredRequests = [];
    for (let i = 0; i < (user.bookingRequests || []).length; i++) {
      if (i === index) {
        denied = user.bookingRequests[i];
      } else {
        filteredRequests.push(user.bookingRequests[i]);
      }
    }
    //only updates booking request array
    await users.doc(currentUser).update({
      bookingRequests: filteredRequests
    });

    const customerRef = await users.doc(denied.user).get();
    const customer = customerRef.data();

    let userBooking;
    const filteredPending = [];
    for (let i = 0; i < (customer.pendingBookings || []).length; i++) {
      const booking = customer.pendingBookings[i];

      if (
        booking.entertainer === currentUser &&
        booking.date === denied.date &&
        !userBooking
      ) {
        userBooking = booking;
      } else {
        filteredPending.push(booking);
      }
    }
    users.doc(denied.user).update({
      pendingBookings: filteredPending //just updates filtered, does nothing with denied.
    });
  }
  render() {
    return (
      <UserProfileContext.Consumer>
        {profile => (
          <div className="container text-center search-container">
            <div className="container profile-container login-container text-center ">
              <h3 className="text-danger">{profile.entertainerName}</h3>
              <p>County: {profile.county}</p>
              <p>Category: {profile.category}</p>
              <p>Your Bio: {profile.bio}</p>
              {profile.picture ? (
                <img src={profile.picture} className="profo" />
              ) : (
                <div className="fa fa-user" />
              )}
            </div>
            <div className="container profile-container login-container text-center ">
              <h3 className="text-danger">Requests</h3>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {(profile.bookingRequests || []).map((req, i) => (
                    <tr key={`${req.user} ${req.date}`}>
                      <td>{req.user}</td>
                      <td>{req.date}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => this.acceptBooking(i)}
                        >
                          Accept
                        </button>
                        {" "}
                        <button
                          className="btn button"
                          onClick={() => this.denyBooking(i)}
                        >
                          Deny
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="container profile-container login-container text-center ">
              <h3 className="text-danger">Bookings</h3>
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Date</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {(profile.confirmedRequests || []).map((req, i) => (
                    <tr key={`${req.user} ${req.date}`}>
                      <td>{req.user}</td>
                      <td>{req.date}</td>
                      <td />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </UserProfileContext.Consumer>
    );
  }
}
