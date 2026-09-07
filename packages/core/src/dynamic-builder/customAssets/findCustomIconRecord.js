import readCustomIconRecords from './readCustomIconRecords.js';

const findCustomIconRecord = (iconName) => {
  const requestedName = String(iconName || '');
  if (requestedName.indexOf('custom:') !== 0) return null;
  return readCustomIconRecords().filter((iconRecord) => iconRecord.iconName === requestedName)[0] || null;
};

export default findCustomIconRecord;
