import formatLocalDateTimeText from './formatLocalDateTimeText.js';
import formatRelativeTimeText from './formatRelativeTimeText.js';

const formatRevisionTimestamp = (savedAtText, nowValue) => {
  const parsedTime = Date.parse(savedAtText || '');
  if (Number.isNaN(parsedTime)) return { relativeText: 'Unknown time', fullText: '' };
  const savedDate = new Date(parsedTime);
  return {
    relativeText: formatRelativeTimeText(savedDate, nowValue),
    fullText: formatLocalDateTimeText(savedDate, { withSeconds: true }),
  };
};

export default formatRevisionTimestamp;
