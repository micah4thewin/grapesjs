import isPlainRecord from '../support/isPlainRecord.js';

const createFindingRecord = (severity, group, message, hint, findingDetails) => ({
  severity,
  group,
  message,
  hint: hint || '',
  ...(isPlainRecord(findingDetails) ? findingDetails : {}),
});

export default createFindingRecord;
