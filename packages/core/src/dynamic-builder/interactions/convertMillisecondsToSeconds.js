const convertMillisecondsToSeconds = (millisecondsValue) => {
  const parsedValue = parseInt(millisecondsValue, 10);
  if (isNaN(parsedValue) || parsedValue <= 0) return '';
  return String(Math.round(parsedValue / 100) / 10);
};

export default convertMillisecondsToSeconds;
