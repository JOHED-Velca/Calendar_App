import { Lunar } from 'lunar-typescript';
import { HOLIDAY, DAY_TYPE } from '@/configs/holidays';
import {
  getFestivals,
  getHoliday,
  getRestDay,
  getSolarTerm,
  getWorkday,
  isWeekendDate,
} from '@/libs/date';

export type Day = {
  date: Date;
  lunarDate: string;
  isToday: boolean;
  isWeekend: boolean;
  holiday?: HOLIDAY;
  restDay?: string;
  workDay?: string;
  isHoliday: boolean;
  isRestDay: boolean;
  isWorkDay: boolean;
  dayType?: DAY_TYPE;
  solarTerm?: string;
  festivals: string[];
};

const getLunarDate = (date: Date) => {
  const lunarDate = Lunar.fromDate(date);

  if (lunarDate.getDay() === 1) {
    return `${lunarDate.getMonthInChinese()}月`;
  }

  return lunarDate.getDayInChinese();
};

const useDay = (date: Date): Day => {
  const currentDate = new Date();

  const isWeekend = isWeekendDate(date);
  const holiday = getHoliday(date);
  const workDay = getWorkday(date);
  const restDay = getRestDay(date);
  const lunarDate = getLunarDate(date);
  const solarTerm = getSolarTerm(date);
  const festivals = getFestivals(date);

  const isHoliday = holiday !== undefined;
  const isRestDay = isHoliday || restDay !== undefined;
  const isWorkDay = workDay !== undefined;
  const isToday =
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear();

  let dayType: DAY_TYPE | undefined = undefined;

  if (isRestDay) {
    dayType = DAY_TYPE.REST_DAY;
  }

  if (isWorkDay) {
    dayType = DAY_TYPE.WORKDAY;
  }

  return {
    date,
    lunarDate,
    isWeekend,
    holiday,
    restDay,
    workDay,
    isHoliday,
    isRestDay,
    isWorkDay,
    isToday,
    dayType,
    solarTerm,
    festivals,
  };
};

export default useDay;
