import isPlainRecord from '../support/isPlainRecord.js';

const readActiveTokenRecord = (editor) => {
  const snapshotText = editor.getModel && editor.getModel().get('dbDesignTokensSnapshot');
  if (!snapshotText) return {};
  try {
    const parsedRecord = JSON.parse(snapshotText);
    return isPlainRecord(parsedRecord) ? parsedRecord : {};
  } catch (parseError) {
    return {};
  }
};

export default readActiveTokenRecord;
