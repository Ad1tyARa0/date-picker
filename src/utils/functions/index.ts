import { DAYS_SHORT, MONTH_MAPPING, MONTH_MAPPING_SHORT } from "../constants";
import { DropdownOptionsType } from "../types";

export const isWeekday = (date: Date): boolean => {
  const dayOfWeek = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }

  return true;
}

export const getWeekdaysInMonth = (year: number, month: number): Date[] => {
  const dates: Date[] = [];

  const firstOfMonth = new Date(year, month - 1, 1);

  for (let i = 0; i <= 31; i++) {
    const d = new Date(firstOfMonth.setDate(i + 1));

    if (isWeekday(d)) {
      dates.push(d);
    }
  }

  return dates;
}

export const getNumberOfDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
}

export const getSortedDays = (year: number, month: number) => {
  const dayIndex = new Date(year, month).getDay();

  const firstHalf = DAYS_SHORT.slice(dayIndex);
  return [...firstHalf, ...DAYS_SHORT.slice(0, dayIndex)];
}

export const getRange = (start: number, end: number) => {
  const length = Math.abs((end - start) / 1);

  const { result } = Array.from({ length }).reduce(({ result, current }) => {
    return {
      result: [...result, current],
      current: current + 1,
    }
  }, { result: [], current: start });

  return result;
}

export const generateYearOptions = (): DropdownOptionsType[] => {
  const startYear = 1900;
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 100;
  // const maxYear = year + 4;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index).map((e: number) => {
    return {
      label: e.toString(),
      value: e,
    }
  });

  return years
}

export const generateMonthOptions = (): DropdownOptionsType[] => {
  return Object.entries(MONTH_MAPPING).map(e => {
    return {
      label: e[1],
      value: parseInt(e[0]),
    }
  })
}

export const getDate = (year: number, month: number, day: number): Date => {
  return new Date(year, month, day);
}

export const isSameDate = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export const getSelectedDates = (startDate: Date | null, endDate: Date | null): Date[] => {
  const selectedDates: Date[] = [];

  if (startDate && endDate) {
    const currentDay = new Date(startDate);
    while (currentDay <= endDate) {
      selectedDates.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }
  };

  return selectedDates;
}

export const convertDates = (dates: Array<Date>): Array<string> => {
  return dates.map(e => {
    const year = e.getFullYear();
    const month = e.getMonth();
    const date = e.getDate();

    return `${year}-${month}-${date}`
  })
}

export const convertDate = (payload: Date): string => {
  const year = payload.getFullYear();
  const month = payload.getMonth();
  const date = payload.getDate();

  return `${year}-${month}-${date}`
}

export const convertDateToLocalString = (payload: Date): string => {
  const year = payload.getFullYear();
  const month = payload.getMonth();
  const date = payload.getDate();

  return `${MONTH_MAPPING_SHORT[month]} ${date} ${year}`
}

export const isEndDateAfterStartDate = (startDate: Date, endDate: Date): boolean => {
  const startYearMonthDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endYearMonthDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  return endYearMonthDay >= startYearMonthDay;
}