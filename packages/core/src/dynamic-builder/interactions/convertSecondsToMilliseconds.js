const convertSecondsToMilliseconds = (secondsValue) => {
  const parsedValue = parseFloat(String(secondsValue || '').replace(',', '.'));
  if (isNaN(parsedValue) || parsedValue <= 0) return '';
  return String(Math.round(parsedValue * 1000));
};

export default convertSecondsToMilliseconds;
