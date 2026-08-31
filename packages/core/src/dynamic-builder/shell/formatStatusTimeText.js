const formatStatusTimeText = (isoTimeText) => {
  const parsedTime = isoTimeText ? new Date(isoTimeText) : new Date();
  if (Number.isNaN(parsedTime.getTime())) return '';
  const padTwoDigits = (numberValue) => String(numberValue).padStart(2, '0');
  return `${padTwoDigits(parsedTime.getHours())}:${padTwoDigits(parsedTime.getMinutes())}`;
};

export default formatStatusTimeText;
