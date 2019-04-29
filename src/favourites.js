import React from "react";
import { UserProfileContext } from "./components/EnsureProfile";
export default function Bookings() {
  return (
    <UserProfileContext.Consumer>
      {({ favourites = [] }) => (
        <div className="container">
          <h3 className="text-danger text-center">Favourites (under Construction)</h3>
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Profile pic</th>
                <th>Entertainer</th>
                <th>Entertainer Area</th>
              </tr>
            </thead>
            <tbody>
               <tr>
                  <td></td>
                  <td></td>
                  <td> </td>
                </tr>
            </tbody>
          </table>
        </div>
      )}
    </UserProfileContext.Consumer>
  );
}
