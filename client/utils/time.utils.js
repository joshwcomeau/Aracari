import moment from 'moment';

export function progressThroughMonth() {
  const numOfDaysInCurrentMonth = moment().daysInMonth();
  const currentDayInMonth = moment().date();

  // Subtracting 1 so that we are always at the start of the current day,
  // not the end. June 1st should be 0% through the month, not 3.33%.
  return (currentDayInMonth - 1) / numOfDaysInCurrentMonth;
}
