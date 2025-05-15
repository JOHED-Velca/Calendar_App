import { useSelectedDate } from '@/hooks/useSelectedDate';
import { getPercentageOfYear } from '@/libs/date';
import { InfoCard } from './ui';
import { isSameDay } from 'date-fns';

// selectedDate is a Date object, indicating the currently selected date
// Shows the year progress of the current date, dividing the year into 12 blocks, each block represents a month
// If the current date is within this month, the background color width of this block is determined according to the progress of the current date within this month, accurate to the day.
const YearProgressCard = () => {
  const { selectedDate } = useSelectedDate();

  const currentMonth = selectedDate.getMonth();
  const currentDay = selectedDate.getDate();
  const currentYear = selectedDate.getFullYear();
  const currentMonthDays = new Date(currentYear, currentMonth + 1, 0).getDate();
  const currentMonthProgress = (currentDay / currentMonthDays) * 100;

  const yearProgressList = Array.from({ length: 12 }, (_, i) => {
    if (i < currentMonth) return '100%';
    if (i === currentMonth) return `${currentMonthProgress}%`;
    return '0%';
  });

  const dayOfYearProgress = getPercentageOfYear(selectedDate);

  const ifIsSameDate = isSameDay(selectedDate, new Date());

  const getTitle = () => {
    const progressText = `${dayOfYearProgress.toFixed(2)}%`;
    if (ifIsSameDate) {
      return `THIS YEAR HAS PASSED${progressText}`;
    } else {
      return `${
        currentMonth + 1
      }${currentDay}THE PROGRESS OF THE YEAR IS${progressText}`;
    }
  };

  return (
    <InfoCard className='flex flex-col gap-2'>
      <span className='text-sm text-zinc-800 dark:text-zinc-200'>
        {getTitle()}
      </span>
      <div className='flex gap-1'>
        {yearProgressList.map((progress, index) => (
          <div
            key={index}
            className='flex items-center justify-between w-full h-4 overflow-hidden text-sm rounded-md bg-slate-200 dark:bg-zinc-400'
          >
            <div
              className='h-full rounded-md bg-slate-400 dark:bg-zinc-500'
              style={{
                width: progress,
              }}
            ></div>
          </div>
        ))}
      </div>
    </InfoCard>
  );
};

export default YearProgressCard;
