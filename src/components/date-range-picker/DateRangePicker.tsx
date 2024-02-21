import React, { useEffect, useState } from "react";

// SCSS.
import "./DateRangePicker.scss";
import { DatePicker } from "../date-picker/DatePicker";

const css_prefix = "drp__";

// Component props.
interface DateRangePickerProps { }

const DateRangePickerComponent: React.FunctionComponent<DateRangePickerProps> = () => {
  const [startMonth, setStartMonth] = useState<number>(new Date().getMonth());
  const [startYear, setStartYear] = useState<number>(new Date().getFullYear());

  const [endMonth, setEndMonth] = useState<number>(startMonth + 1);
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());

  // const currentDate = new Date();
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  // const nextDayDate = new Date(currentDate).setDate(currentDate.getDate() + 1);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDateSelected, setStartDateSelected] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);

  console.log(selectedDates);

  const handleChangeSelectedDates = (selectedDate: Date) => {
    console.log(selectedDate);

    if (startDateSelected) {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }

    setStartDateSelected(!startDateSelected);
    // const dates = getSelectedDatesInRange();
    // console.log(dates);
  }

  useEffect(() => {
      const selectedDates: Date[] = [];

      if (startDate && endDate) {
        const currentDay = new Date(startDate);
        while (currentDay <= endDate) {
          selectedDates.push(new Date(currentDay));
          currentDay.setDate(currentDay.getDate() + 1);
        }
      }

      setSelectedDates(selectedDates);
  }, [startDate, endDate])

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}date-range-input`}>

      </div>

      <div className={`${css_prefix}date-range-container`}>
        {/* <div className={`${css_prefix}date-picker-container`}> */}
        <DatePicker
          startDate={startDate}
          // selectStartDate={handleClickSelectStartDate}
          month={startMonth}
          setMonth={setStartMonth}
          year={startYear}
          setYear={setStartYear}
          endDate={endDate}
          handleChangeSelectedDates={handleChangeSelectedDates}
          selectedDates={selectedDates}
        />
        
        {/* </div> */}

        {/* <DatePicker
          selectedDate={endDate}
          month={endMonth}
          setMonth={setEndMonth}
          year={endYear}
          setYear={setEndYear}
        /> */}
      </div>
    </div>
  );
};

export const DateRangePicker = DateRangePickerComponent;