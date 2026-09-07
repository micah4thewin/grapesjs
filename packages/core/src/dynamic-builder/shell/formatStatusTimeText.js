const formatStatusTimeText = (isoTimeText, referenceTime) => {
  const parsedTime = isoTimeText ? new Date(isoTimeText) : new Date();
  if (Number.isNaN(parsedTime.getTime())) return '';
  const nowTime = referenceTime ? new Date(referenceTime) : new Date();
  const elapsedSeconds = (nowTime.getTime() - parsedTime.getTime()) / 1000;
  if (elapsedSeconds >= 0 && elapsedSeconds < 60) return 'just now';
  const padTwoDigits = (numberValue) => String(numberValue).padStart(2, '0');
  const clockText = `${padTwoDigits(parsedTime.getHours())}:${padTwoDigits(parsedTime.getMinutes())}`;
  const startOfDay = (dateValue) => new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate());
  const dayDifference = Math.round((startOfDay(nowTime) - startOfDay(parsedTime)) / 86400000);
  if (dayDifference === 0) return `at ${clockText}`;
  if (dayDifference === 1) return `yesterday at ${clockText}`;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${parsedTime.getDate()} ${monthNames[parsedTime.getMonth()]} at ${clockText}`;
};

export default formatStatusTimeText;
