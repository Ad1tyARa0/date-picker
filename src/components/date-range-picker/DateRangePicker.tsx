import React, { useEffect, useState } from "react";

// SCSS.
import "./DateRangePicker.scss";
import { DatePicker } from "../date-picker/DatePicker";
import { isWeekday } from "../../utils/functions";

const css_prefix = "drp__";

// Component props.
interface DateRangePickerProps {
  handleChange: (payload: Array<Array<Date>>) => void;
  predefinedRanges: Array<{ title: string, value: number, id: number }>
}

const DateRangePickerComponent: React.FunctionComponent<DateRangePickerProps> = ({
  handleChange,
  predefinedRanges
}) => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [nextMonth, setNextMonth] = useState<number>(new Date().getMonth() + 1);

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [nextYear, setNextYear] = useState<number>(new Date().getFullYear());

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
        <DatePicker
          startDate={startDate}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          endDate={endDate}
          handleChangeSelectedDates={handleChangeSelectedDates}
          selectedDates={selectedDates}
        />

        <div className={`${css_prefix}divider`} />

        <DatePicker
          startDate={startDate}
          month={nextMonth}
          setMonth={setNextMonth}
          year={nextYear}
          setYear={setNextYear}
          endDate={endDate}
          handleChangeSelectedDates={handleChangeSelectedDates}
          selectedDates={selectedDates}
        />
      </div>

      <div className={`${css_prefix}date-range-actions`}>
        {predefinedRanges.map((e) => {
          return (
            <div key={e.id} className={`${css_prefix}date-range-action-item`}>
              {e.title}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export const DateRangePicker = DateRangePickerComponent;