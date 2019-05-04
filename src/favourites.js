import React from "react";
import { UserProfileContext } from "./components/EnsureProfile";
export default function Bookings() {

  return (
    <UserProfileContext.Consumer>
      {({ favourites = [] }) => (
        <div className="container">
          <h3 className="text-danger text-center">Favourites</h3>
          <table className="table table-stripe">
            <thead>
              <tr>
                <th>Entertainer</th>
                <th>Date Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
               {/* <tr>
                  <td></td>
                  <td></td>
                  <td> </td>
                </tr> */}
                {favourites.map(req => (
                <tr key={`${req.entertainer} ${req.date}`}>
                  <td>{req.entertainer}</td>
                  <td>{req.date}</td>
                  <td>
                      <button
                        className="button"
                        //onClick={() => this.delete()}
                      >
                        Delete
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </UserProfileContext.Consumer>
  );
}

// delete(id){
//   const user = fire.auth().currentUser.email;
//   const users = fire.firestore().collection("/users");
//   firebase.firestore().collection("users").doc(user).delete().then(() => {
//     console.log("Document successfully deleted!");
//     this.props.history.push("/")
//   }).catch((error) => {
//     console.error("Error removing document: ", error);
//   });
// }

