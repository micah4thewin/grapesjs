import formatLocalDateTimeText from './formatLocalDateTimeText.js';

const formatRelativeTimeText = (dateValue, nowValue) => {
  const parsedDate = dateValue instanceof Date ? dateValue : new Date(dateValue || NaN);
  if (Number.isNaN(parsedDate.getTime())) return '';
  const nowDate = nowValue instanceof Date ? nowValue : new Date();
  const elapsedSeconds = Math.max(0, Math.round((nowDate.getTime() - parsedDate.getTime()) / 1000));
  if (elapsedSeconds < 45) return 'just now';
  const elapsedMinutes = Math.round(elapsedSeconds / 60);
  if (elapsedMinutes < 60) return elapsedMinutes + (elapsedMinutes === 1 ? ' minute ago' : ' minutes ago');
  const elapsedHours = Math.round(elapsedMinutes / 60);
  if (elapsedHours < 24) return elapsedHours + (elapsedHours === 1 ? ' hour ago' : ' hours ago');
  const elapsedDays = Math.round(elapsedHours / 24);
  if (elapsedDays === 1) return 'yesterday';
  if (elapsedDays < 7) return elapsedDays + ' days ago';
  return formatLocalDateTimeText(parsedDate);
};

export default formatRelativeTimeText;
