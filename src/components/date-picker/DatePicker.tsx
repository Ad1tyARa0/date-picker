import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

// Constants.
import { MONTH_MAPPING_SHORT } from "../../utils/constants";

// Components.
import { CustomDropdown } from "../custom-dropdown/CustomDropdown";

// Utils
import { convertDate, convertDates, generateMonthOptions, generateYearOptions, getDate, getNumberOfDaysInMonth, getRange, getSortedDays, isSameDate, isWeekday } from "../../utils/functions";

// SCSS.
import "./DatePicker.scss";

const css_prefix = "dp__";

// Component props.
interface DatePickerProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  startDate: Date | null;
  endDate: Date | null;
  handleChangeSelectedDates: (selectedDate: Date) => void;
  selectedDates: Array<Date>;
}

const DatePickerComponent: React.FunctionComponent<DatePickerProps> = ({
  month,
  setMonth,
  year,
  setYear,
  startDate,
  endDate,
  handleChangeSelectedDates,
  selectedDates,
}) => {
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

  return (
    <div className={`${css_prefix}main`}>
      <div className={`${css_prefix}header`}>
        <div className={`${css_prefix}icon`} onClick={onClickPreviousMonth}>
          <FaChevronLeft fontSize={12} />
        </div>

        <div className={`${css_prefix}month-container`}>
          <CustomDropdown title={MONTH_MAPPING_SHORT[month]} value={month} handleChange={handleChangeMonth} options={generateMonthOptions()} />
        </div>

        <div className={`${css_prefix}date-container`}>
          <CustomDropdown title={year.toString()} value={year} handleChange={handleChangeYear} options={generateYearOptions()} />
        </div>

        <div className={`${css_prefix}icon`} onClick={onClickNextMonth}>
          <FaChevronRight fontSize={12} />
        </div>
      </div>

      <div className={`${css_prefix}body`}>
        <div className={`${css_prefix}calendar`}>
          {getSortedDays(year, month).map((e) => {
            return (
              <div key={e} className={`${css_prefix}days`}>
                {e}
              </div>
            )
          })}
        </div>

        <div className={`${css_prefix}calendar`}>
          {getRange(1, getNumberOfDaysInMonth(year, month) + 1).map((e) => {
            const checkWeekday = checkIfDateIsWeekday(e);
            const date = getDate(year, month, e)
            let isSameStart = false;
            let isSameEnd = false;

            if (startDate) {
              isSameStart = isSameDate(date, startDate);
            }

            if (endDate) {
              isSameEnd = isSameDate(date, endDate);
            }

            const convertedDates = convertDates(selectedDates);
            const convertedDate = convertDate(date);

            return (
              <div
                key={e}
                onClick={() => {
                  if (isWeekday(date)) {
                    handleChangeSelectedDates(date)
                  }
                }} 
                className={`${css_prefix}date 
                  ${!checkWeekday ? css_prefix + 'date-disabled' : ''}
                  ${isSameStart || isSameEnd ? css_prefix + 'date-selected' : (convertedDates.includes(convertedDate) || selectedDates.some(e => e.getTime() === date.getTime())) && date > startDate! && date < endDate! && isWeekday(date) ? css_prefix + 'date-highlighted' : ''}
                `}
              >
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