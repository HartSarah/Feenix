import React from "react";
import "react-dates/initialize";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./EntertainerDashboard.css";
import { UserProfileContext } from "./components/EnsureProfile";
import { fire } from "./fire";

export default class ProfileViewer extends React.Component {
  async acceptBooking(index) {
    const currentUser = fire.auth().currentUser.email;
    const users = fire.firestore().collection("/users");

    const userRef = await users.doc(currentUser).get();
    const user = userRef.data();

    let accepted;
    const filteredRequests = [];
    for (let i = 0; i < (user.bookingRequests || []).length; i++) {
      if (i === index) {
        accepted = user.bookingRequests[i];
      } else {
        filteredRequests.push(user.bookingRequests[i]);
      }
    }

    await users.doc(currentUser).update({
      confirmedRequests: [...(user.confirmedRequests || []), accepted],
      bookingRequests: filteredRequests
    });

    const customerRef = await users.doc(accepted.user).get();
    const customer = customerRef.data();

    let userBooking;
    const filteredPending = [];
    for (let i = 0; i < (customer.pendingBookings || []).length; i++) {
      const booking = customer.pendingBookings[i];

      if (
        booking.entertainer === currentUser &&
        booking.date === accepted.date &&
        !userBooking
      ) {
        userBooking = booking;
      } else {
        filteredPending.push(booking);
      }
    }
    users.doc(accepted.user).update({
      pendingBookings: filteredPending,
      confirmedBookings: [...(customer.confirmedBookings || []), userBooking]
    });
  }
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
      pendingBookings: filteredPending
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
