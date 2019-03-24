import React from "react";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
export default function ProfileViewer() {
  return (
    <div>
      <div className="container-fluid">
        <h2>Band Name</h2>
        <div className="card">
          <div className="media">
            <div>Info</div>
            <img src="" alt="placeholder" className="float-right" />
          </div>
        </div>
        <DayPickerSingleDateController
          date={null}
          onFocusChange={() => {}}
          onDateChange={() => {}}
          focused={true}
        />
      </div>
    </div>
  );
}
