import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useMemo } from 'react';

export enum FirstDayOfWeek {
  Sunday,
  Monday,
}

type Preference = {
  // Display dates outside this month
  showExtraDays: boolean;
  // What day is the first day of the week?
  firstDayOfWeek: FirstDayOfWeek;
  // Display the content at the bottom of the date
  showDateContent: boolean;
  // Mark weekends
  markWeekend: boolean;
  desktopLayout: 'horizontal' | 'vertical';
};

const initialPreference: Preference = {
  showExtraDays: true,
  firstDayOfWeek: FirstDayOfWeek.Sunday,
  desktopLayout: 'horizontal',
  markWeekend: true,
  showDateContent: true,
};

const preferenceAtom = atomWithStorage<Preference>(
  'preference',
  initialPreference,
  undefined,
  {
    getOnInit: true,
  }
);

export const usePreference = () => {
  const [storedPreference, setPreference] = useAtom(preferenceAtom);

  // Merge default values ​​and stored values ​​to prevent problems caused by newly added configuration items that have not yet been stored
  const preference = useMemo(() => {
    return {
      ...initialPreference,
      ...storedPreference,
    };
  }, [storedPreference]);

  const setFirstDayOfWeekToMonday = () => {
    setPreference({
      ...preference,
      firstDayOfWeek: FirstDayOfWeek.Monday,
    });
  };

  const setFirstDayOfWeekToSunday = () => {
    setPreference({
      ...preference,
      firstDayOfWeek: FirstDayOfWeek.Sunday,
    });
  };

  const toggleShowExtraDays = () => {
    setPreference({ ...preference, showExtraDays: !preference.showExtraDays });
  };

  const toggleShowDateContent = () => {
    setPreference({
      ...preference,
      showDateContent: !preference.showDateContent,
    });
  };

  const toggleDesktopLayout = () => {
    setPreference({
      ...preference,
      desktopLayout:
        preference.desktopLayout === 'horizontal' ? 'vertical' : 'horizontal',
    });
  };

  const toggleMarkWeekend = () => {
    setPreference({
      ...preference,
      markWeekend: !preference.markWeekend,
    });
  };

  return {
    preference,
    setPreference,
    setFirstDayOfWeekToMonday,
    setFirstDayOfWeekToSunday,
    toggleShowExtraDays,
    toggleShowDateContent,
    toggleDesktopLayout,
    toggleMarkWeekend,
  };
};
