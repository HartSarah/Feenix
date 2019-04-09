import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { fire } from './fire';
import { Link } from 'react-router-dom';

class testCreate extends Component {

  constructor() {
    super();
    this.ref = fire.firestore().collection('users');
    this.state = {
      name: '',
      location: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { name, location } = this.state;
    console.log(name,location);
    this.ref.add({
      name,
      location
    }).then((docRef) => {
      this.setState({
        name: '',
        location: ''
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { name, location } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" class="form-control" name="name" value={name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="location">Location:</label>
                <input type="text" class="form-control" name="location" onChange={this.onChange} placeholder="name" cols="80" rows="3" />
              </div>
             
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default testCreate;