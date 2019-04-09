const monthList = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
];
const days = [
  'mon',
  'thu',
  'wed',
  'thu',
  'fry',
  'sat',
  'sun',
];
export const getMonth = (month) => {
  const monthName = monthList[month];
  return monthName ? monthName : '';
};
export const getDay = (day) => {
  const dayName = days[day];
  return dayName ? dayName : '';
};
export const getFormatedDate = (date) => {
  const day = getDay(date.getDay());
  const dayNumber = date.getDate();
  const month = getMonth(date.getMonth());
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const dateFormat = `${day} ${dayNumber} ${month} ${year} ${hours}:${minutes}`;
  return dateFormat;
};

