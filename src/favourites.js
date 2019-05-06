import React from "react";
import { UserProfileContext } from "./components/EnsureProfile";
import { fire } from "./fire";
export default class ProfileViewer extends React.Component {
  
  //async delete function which deletes elements in the favourite function firebase.
  async deleteFavourites(index) {
    const currentUser = fire.auth().currentUser.email;
    const users = fire.firestore().collection("/users");

    const userRef = await users.doc(currentUser).get();
    const user = userRef.data();

    //deleted elements are stored in deletedFavouites
    const deletedFavourites = [];
    for (let i = 0; i < (user.favourites || []).length; i++) {
      if (i === index) {
      } else {
        //pushes method which goes through fav
        deletedFavourites.push(user.favourites[i]);
      }
    }
    //upadated in firebase on the current user (it updates the variables)
    await users.doc(currentUser).update({
      favourites: deletedFavourites
    });

  }
  render() {
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
                {favourites.map((req, i) => (
                <tr key={`${req.entertainer} ${req.date}`}>
                  <td>{req.entertainer}</td>
                  <td>{req.date}</td>
                  <td>
                      <button
                        className="button"
                        onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteFavourites(i)} }
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

}