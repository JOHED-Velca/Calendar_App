// import {
//   workdays,
// } from '@/configs/holidays';
import { FirstDayOfWeek } from '@/hooks/usePreference';
// import dayjs from 'dayjs';

export const getPercentageOfYear = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1); // The first day of the year
  const endOfYear = new Date(date.getFullYear(), 11, 31); // The last day of the year

  const totalMilliseconds = endOfYear.getTime() - startOfYear.getTime(); // Total number of milliseconds in the current year
  const elapsedMilliseconds = date.getTime() - startOfYear.getTime(); // The number of milliseconds that have passed

  const percentage = (elapsedMilliseconds / totalMilliseconds) * 100; // Calculating Percentages

  return Math.round(percentage * 100) / 100; // Returns the percentage with two decimal places
};

// export const getWorkday = (date: Date) => {
//   const dateStr = dayjs(date).format('YYYY-MM-DD');
//   const holiday = workdays.get(dateStr);
//   return holiday;
// };

export const generateDateList = (
  startDate: Date,
  endDate: Date,
  firstDayOfWeek: FirstDayOfWeek
): Date[] => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const isFirstDayOfWeekSunday = firstDayOfWeek === FirstDayOfWeek.Sunday;
  const isFirstDayOfWeekMonday = firstDayOfWeek === FirstDayOfWeek.Monday;

  let startDayOfWeek = start.getDay();
  let endDayOfWeek = end.getDay();

  // Adjust the start and end dates based on firstDayOfWeek
  // If firstDayOfWeek is Monday, then Sunday should have a value of 7
  if (isFirstDayOfWeekMonday) {
    if (startDayOfWeek === 0) {
      startDayOfWeek = 7;
    }
    if (endDayOfWeek === 0) {
      endDayOfWeek = 7;
    }
  }

  const startDifference = startDayOfWeek - (isFirstDayOfWeekSunday ? 0 : 1);

  start.setDate(start.getDate() - startDifference);

  const endDifference = (isFirstDayOfWeekSunday ? 6 : 7) - endDayOfWeek;

  end.setDate(end.getDate() + endDifference);

  const dateList: Date[] = [];

  // Loop to generate a list of dates
  while (start <= end) {
    dateList.push(new Date(start));
    start.setDate(start.getDate() + 1);
  }

  return dateList;
};
