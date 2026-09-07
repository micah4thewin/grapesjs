import isPlainRecord from '../support/isPlainRecord.js';

const parseJsonRecord = (jsonText) => {
  try {
    const parsedValue = JSON.parse(String(jsonText || '') || '{}');
    return isPlainRecord(parsedValue) ? parsedValue : {};
  } catch (parseError) {
    return {};
  }
};

export default parseJsonRecord;
