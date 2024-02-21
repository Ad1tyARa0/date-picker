import React, { useEffect, useState } from "react";

// SCSS.
import "./DateRangePicker.scss";
import { DatePicker } from "../date-picker/DatePicker";
import { isWeekday } from "../../utils/functions";

const css_prefix = "drp__";

// Component props.
interface DateRangePickerProps {
  handleChange: (payload: Array<Array<Date>>) => void;
}

const DateRangePickerComponent: React.FunctionComponent<DateRangePickerProps> = ({
  handleChange,
}) => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDateSelected, setStartDateSelected] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);

  const handleChangeSelectedDates = (selectedDate: Date) => {
    if (startDateSelected) {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }

    setStartDateSelected(!startDateSelected);

  }
  useEffect(() => {
    if (startDate && endDate) {
      const weekendDates = selectedDates.filter(e => !isWeekday(e));
      
      handleChange([[startDate, endDate], weekendDates])
    }
  }, [startDate, endDate, selectedDates])
  
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
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
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