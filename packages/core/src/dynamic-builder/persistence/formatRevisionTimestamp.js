import formatIsoDateTimeText from './formatIsoDateTimeText.js';

const formatRevisionTimestamp = (savedAtText) => {
  const parsedTime = Date.parse(savedAtText || '');
  if (Number.isNaN(parsedTime)) return 'Unknown time';
  return formatIsoDateTimeText(new Date(parsedTime)) + ' UTC';
};

export default formatRevisionTimestamp;
