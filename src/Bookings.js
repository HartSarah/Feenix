import React from "react";
import { UserProfileContext } from "./components/EnsureProfile";
export default function Bookings() {
  return (
    <UserProfileContext.Consumer>
      {({ pendingBookings = [], confirmedBookings = [] }) => (
        <div className="container">
          <h3 className="text-danger text-center">Bookings</h3>
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Entertainer</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map(req => (
                <tr key={`${req.entertainer} ${req.date}`}>
                  <td>{req.entertainer}</td>
                  <td>{req.date}</td>
                  <td>
                    <button className="btn button">Pending</button>
                  </td>
                  <td />
                </tr>
              ))}
              {confirmedBookings.map(req => (
                <tr key={`${req.entertainer} ${req.date}`}>
                  <td>{req.entertainer}</td>
                  <td>{req.date}</td>
                  <td>
                    <button className="btn btn-success">Confirmed</button>
                  </td>
                  <td />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </UserProfileContext.Consumer>
  );
}
