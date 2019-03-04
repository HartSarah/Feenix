import React from "react";
import "./UserSearch.css";


export default class UserSearch extends React.Component {
    state = { };
    render() {
      return (
        <div className="container text-center Search-container">
        <div className="tab-content py-4 px-5">
        <div className="form-group">
        <input
          type="search"
          placeholder="Search"
          className="form-control"
        />
      </div>
      <div className="form-group">
      <button className="btn btn-dark">Search</button>
      </div>
      </div>
      </div>
      );
    }
}