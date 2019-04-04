import React from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./ProfileViewer.css";

export default function ProfileViewer() {
  return (
    <div>
      <div className="container text-center search-container">
        <h1 className="search-header">Feenix</h1>
        <p className="text">
          You are looking at an Entertainer's profile.
        </p>
        <div className="container-fluid">
          <h2 className="subHeading">Name</h2>
          <div className="card">
            <div className="text">
              <div>Info</div>
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
