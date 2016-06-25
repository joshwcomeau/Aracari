import moment from 'moment';

// Calculate the percentage through the current month. For example,
// on the 6th day of a 30-day month, we're 20% of the way through.
export function getProgressThroughMonth(datem = moment()) {
  const numOfDaysInCurrentMonth = datem.daysInMonth();
  const currentDayInMonth = datem.date();

  // Subtracting 1 so that we are always at the start of the current day,
  // not the end. June 1st should be 0% through the month, not 3.33%.
  return (currentDayInMonth - 1) / numOfDaysInCurrentMonth * 100;
}
