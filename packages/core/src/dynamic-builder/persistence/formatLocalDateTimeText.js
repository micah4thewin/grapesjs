const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatLocalDateTimeText = (dateValue, options = {}) => {
  const parsedDate = dateValue instanceof Date ? dateValue : new Date(dateValue || NaN);
  if (Number.isNaN(parsedDate.getTime())) return '';
  const padTwoDigits = (numberValue) => String(numberValue).padStart(2, '0');
  const timeText = padTwoDigits(parsedDate.getHours()) + ':' + padTwoDigits(parsedDate.getMinutes());
  const secondsText = options.withSeconds ? ':' + padTwoDigits(parsedDate.getSeconds()) : '';
  const dateText = parsedDate.getDate() + ' ' + monthNames[parsedDate.getMonth()] + ' ' + parsedDate.getFullYear();
  return dateText + ', ' + timeText + secondsText;
};

export default formatLocalDateTimeText;
