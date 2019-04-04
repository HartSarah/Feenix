import React from "react";
import "react-dates/initialize";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./EntertainerDashboard.css";

export default function ProfileViewer() {
  return (
    <div>
      <div className="container text-center search-container">
        <h1 className="search-header">Feenix</h1>
        <p className="text">
          You are looking at your profile! <br/>
          Click on a section to edit it
        </p>
        <div className="container-fluid">
          <h2 className="subHeading">Your Name</h2>
          <div className="card">
            <div className="text">
              <p>Your info</p>
              <img src="" className="float-right" />
            </div>
          </div>
          <div className="calendar">
            <DayPickerSingleDateController
              date={null}
              onFocusChange={() => { }}
              onDateChange={() => { }}
              focused={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
