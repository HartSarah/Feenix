import React from "react";
import "react-dates/initialize";
import { DayPickerSingleDateController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

export default function Calendar() {
  return (
    <div className="container text-center">
      <DayPickerSingleDateController
        date={null}
        onFocusChange={() => {}}
        onDateChange={() => {}}
        focused={true}
      />
    </div>
  );
}
