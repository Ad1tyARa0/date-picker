import React, { useEffect, useState } from "react";

// Components.
import { DatePicker } from "../date-picker/DatePicker";

// Utils.
import { getSelectedDates, isWeekday } from "../../utils/functions";

// SCSS.
import "./DateRangePicker.scss";

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

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDateSelected, setStartDateSelected] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);

  useEffect(() => {
    if (startDate && endDate) {
      const weekendDates = selectedDates.filter(e => !isWeekday(e));

      handleChange([[startDate, endDate], weekendDates])
    };
  }, [startDate, endDate, selectedDates]);

  useEffect(() => {
    const result = getSelectedDates(startDate, endDate);
    setSelectedDates(result);
  }, [startDate, endDate]);

  const handleChangeSelectedDates = (selectedDate: Date) => {
    if (startDateSelected) {
      setStartDate(selectedDate);
    } else {
      setEndDate(selectedDate);
    }

    setStartDateSelected(!startDateSelected);
  };

  const handleClickDateRangeActionButtons = (payload: number) => {
    const currentDate = new Date();
    const newDate = new Date(currentDate);
    const resultDate = new Date(newDate.setDate(currentDate.getDate() - payload));
    setStartDate(resultDate);
    setEndDate(new Date());
  };

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
            <div key={e.id} className={`${css_prefix}date-range-action-item`} onClick={() => handleClickDateRangeActionButtons(e.value)}>
              {e.title}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export const DateRangePicker = DateRangePickerComponent;