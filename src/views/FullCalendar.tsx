import Calendar from '@/components/Calendar';
import CalendarHeader from '@/components/CalendarHeader';
import useCalendar from '@/hooks/useCalendar';
import { usePreference } from '@/hooks/usePreference';

const FullCalendar = () => {
  const { dayList } = useCalendar();
  const {
    preference: { firstDayOfWeek, showExtraDays, showDateContent, markWeekend },
  } = usePreference();

  return (
    <div className='w-full md:w-[37.5rem] overflow-hidden rounded-lg shadow-lg md:border-r max-md:dark:border-b shadow-slate-200 dark:shadow-none border-zinc-400/20'>
      <CalendarHeader />
      <Calendar
        dayList={dayList}
        firstDayOfWeek={firstDayOfWeek}
        showExtraDays={showExtraDays}
        showDateContent={showDateContent}
        markWeekend={markWeekend}
      />
    </div>
  );
};

export default FullCalendar;
