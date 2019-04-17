import React from "react";
import { Link } from "react-router-dom";
import "./EditProfile.css";
import { fire } from './fire';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    //this.ref = fire.firestore().collection('users');
    this.state = {
      userType: "customer",
      firstName: '',
      surname:'',
      dob:'',
      bio:'',
      picture: '',
      age:'',
      category:'',
      county:'',
    };
  }

  componentDidMount() {
  const ref = fire.firestore().collection('users').doc(this.props.match.params.id);
  ref.get().then((doc) => {
    if (doc.exists) {
      const board = doc.data();
      this.setState({
        key: doc.id,
        title: board.title,
        description: board.description,
        author: board.author
      });
    } else {
      console.log("No such document!");
    }
  });
}
/*
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
*/
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({board:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { userType,firstName,surname,dob,bio,picture,age,category,county } = this.state;
    console.log( userType,firstName,surname,dob,bio,picture,age,category,county);

    const updateRef = fire.firestore().collection('boards').doc(this.state.key);
    updateRef.set({
      userType,
      firstName,
      surname,
      dob,
      bio,
      picture,
      age,
      category,
      county
    }).then((docRef) => {
      this.setState({
      userType: "customer",
      firstName: '',
      surname:'',
      dob:'',
      bio:'',
      picture: '',
      age:'',
      category:'',
      county:'',
      });
      //this.props.history.push("/show/"+this.props.match.params.id)
      this.props.history.push("./UserNavigation");

    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div className="container text-center search-container">
        <h1 className="header">Feenix</h1>
        <p className="text">
          Please choose from the drop down if you are a customer or an entertainer <br />
          Then create your profile
        </p>
       {/*
        <div className="form-group">
          {// changes the state of the class depending on which option is selected //}
          <select
            className="form-control"
            // value equals the current value of the userType
            //value={this.state.userType}
            // sets the state of the claas when the value changes
            onChange={this.onTypeChange}
          >
            <option value="customer">Customer</option>
            <option value="entertainer">Entertainer</option>
          </select>
        </div>
    */}
    <form onSubmit={this.onSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" name="firstName" value={this.firstName} onChange={this.onChange} placeholder="First Name" />
      </div>
      <div className="form-group">
        <input type="text" className="form-control" name="surname" value={this.surname} onChange={this.onChange} placeholder="Surname" />
      </div>
      <div className="form-group">
        <input type="date" className="form-control" name="age" value={this.age} onChange={this.onChange} placeholder="Age" />
      </div>
      <div className="form-group">
        <textarea type="text" className="form-control" name="bio" value={this.bio} onChange={this.onChange} placeholder="Bio" />
      </div>
      <div className="form-group">
        <input
          type="file"
          placeholder="Profile Picture" name="picture" value={this.picture} onChange={this.onChange}
          className="form-control"
        />
      </div>
      <div>
      <button className="button">Edit customer profile!</button>
      </div>
    </form>
      </div>
    );
}
}
export default EditProfile;