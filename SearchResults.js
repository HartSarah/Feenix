import React from "react";
import { Link } from "react-router-dom";

export default function SearchResults() {
  return (
    <div>
      <input type="search" className="form-control" placeholder="Search" />
      <div className="container">
        <Link to="ProfileViewer">
          <div className="card">
            Sample
            <img src="" alt="link" />
          </div>
        </Link>
      </div>
    </div>
  );
}
