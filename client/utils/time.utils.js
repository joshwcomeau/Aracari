import moment from 'moment';

export function progressThroughMonth() {
  const numOfDaysInCurrentMonth = moment().daysInMonth();
  const currentDayInMonth = moment().date();

  return currentDayInMonth / numOfDaysInCurrentMonth;
}
