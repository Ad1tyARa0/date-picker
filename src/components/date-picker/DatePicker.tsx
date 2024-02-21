import React, { useState } from "react";
// import { PiArrowSquareRightFill } from "react-icons/pi"
// import { PiArrowSquareLeftFill } from "react-icons/pi";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";


// SCSS.
import "./DatePicker.scss";
import { MONTHS, MONTH_MAPPING, MONTH_REVERSE_MAPPING } from "../../utils/constants";
import { generateMonthOptions, generateYearOptions, getNumberOfDaysInMonth, getRange, getSortedDays, isWeekday } from "../../utils/functions";
import { CustomDropdown } from "../custom-dropdown/CustomDropdown";

const css_prefix = "dp__";

// Component props.
interface DatePickerProps { }

const DatePickerComponent: React.FunctionComponent<DatePickerProps> = () => {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [year, setYear] = useState<number>(new Date().getFullYear());

  const checkIfDateIsWeekday = (date: number): boolean => {
    return isWeekday(new Date(year, month, date));
  }

  const handleChangeMonth = (payload: number) => {
    setMonth(payload);
  }

  const handleChangeYear = (payload: number) => {
    setYear(payload)
  }

  const onClickNextMonth = () => {
    if (month < 11) {
      setMonth(prev => prev + 1);
    } else {
      setMonth(0);
      setYear(prev => prev + 1);
    }
  };

  const onClickPreviousMonth = () => {
    if (month > 0) {
      setMonth(prev => prev - 1);
    } else {
      setMonth(11);
      setYear(prev => prev - 1);
    }
  };

  generateMonthOptions();

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}header`}>
        <div className={`${css_prefix}icon`} onClick={onClickPreviousMonth}>
          <FaChevronLeft />
        </div>

        <div className={`${css_prefix}month-container`}>
          <CustomDropdown title={MONTH_MAPPING[month]} value={month} handleChange={handleChangeMonth} options={generateMonthOptions()} />
        </div>

        <div className={`${css_prefix}date-container`}>
          <CustomDropdown title={year.toString()} value={year} handleChange={handleChangeYear} options={generateYearOptions()} />
        </div>

        <div className={`${css_prefix}icon`} onClick={onClickNextMonth}>
          <FaChevronRight />
        </div>
      </div>

      <div className={`${css_prefix}body`}>
        <div className={`${css_prefix}calendar`}>
          {getSortedDays(year, month).map((e) => {
            return (
              <div className={`${css_prefix}days`}>
                {e}
              </div>
            )
          })}
        </div>

        <div className={`${css_prefix}calendar`}>
          {getRange(1, getNumberOfDaysInMonth(year, month) + 1).map((e) => {
            const checkWeekday = checkIfDateIsWeekday(e); 
            
            return (
              <div onClick={() => checkIfDateIsWeekday(e)} className={`${css_prefix}date ${!checkWeekday ? css_prefix + 'date-disabled' : ''}`}>
                {e}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export const DatePicker = DatePickerComponent;
