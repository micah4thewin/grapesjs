import downloadTextFile from '../support/downloadTextFile.js';

const downloadDataSourceJson = (sourceName, sourceValue) => {
  let jsonText = '[]';
  try {
    jsonText = JSON.stringify(sourceValue == null ? [] : sourceValue, null, 2);
  } catch {
    jsonText = '[]';
  }
  downloadTextFile(`${sourceName || 'data-source'}.json`, 'application/json', jsonText);
};

export default downloadDataSourceJson;
