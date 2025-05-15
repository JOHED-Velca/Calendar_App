import { Day } from '@/interfaces/day';
import {
} from '@/libs/date';
import { isWeekend as isWeekendFunc } from 'date-fns';

export const getBadgeText = (day: Day, customBadge?: string) => {
  if (customBadge !== undefined) {
    return customBadge;
  }
  if (day.isToday) {
    return '';
  }
  return '';
};

export const generateDay = (date: Date, range?: [Date, Date]): Day => {
  const currentDate = new Date();

  const isWeekend = isWeekendFunc(date);
  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  let isInRange = false;

  if (range) {
    const [startDate, endDate] = range;
    isInRange =
      date.getTime() >= startDate.getTime() &&
      date.getTime() <= endDate.getTime();
  }

  return {
    date,
    isWeekend,
    isToday,
    isInRange,
  };
};
