import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { PiCalendarCheckDuotone } from "react-icons/pi";

// Components.
import { DatePicker } from "../date-picker/DatePicker";

// Utils.
import { convertDateToLocalString, getSelectedDates, isWeekday } from "../../utils/functions";

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
  const [secondMonth, setSecondMonth] = useState<number>(new Date().getMonth() + 1);

  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [secondYear, setSecondYear] = useState<number>(new Date().getFullYear());

  const currentDate = new Date();
  const initalEndDate = new Date(currentDate.getTime() + (2 * 24 * 60 * 60 * 1000));
  
  const [startDate, setStartDate] = useState<Date | null>(currentDate);
  const [endDate, setEndDate] = useState<Date | null>(initalEndDate);
  const [startDateSelected, setStartDateSelected] = useState<boolean>(true);
  const [selectedDates, setSelectedDates] = useState<Array<Date>>([]);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

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

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate?.getTime() > endDate?.getTime()) {
        setStartDate(endDate);
        setEndDate(startDate);
      }
    }
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
    setMonth(new Date().getMonth());
    setSecondMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
    setSecondYear(new Date().getFullYear());
  };

  return (
    <div className={`${css_prefix}body`}>
      <div className={`${css_prefix}date-range-input`} onClick={() => setShowCalendar(!showCalendar)}>
        <div className={`${css_prefix}date-range-input-main`}>
          {startDate && convertDateToLocalString(startDate)}

          <div className={`${css_prefix}date-range-input-icon`}>
            <FaArrowRightLong />
          </div>

          {endDate && convertDateToLocalString(endDate)}
        </div>

        <div className={`${css_prefix}date-range-calendar-icon`}>
          <PiCalendarCheckDuotone />
        </div>
      </div>


      <div className={`${css_prefix}main ${showCalendar ? css_prefix + 'main-shown' : css_prefix + 'main-hidden'}`}>
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
            month={secondMonth}
            setMonth={setSecondMonth}
            year={secondYear}
            setYear={setSecondYear}
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
    </div>
  );
};

export const DateRangePicker = DateRangePickerComponent;