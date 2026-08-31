import getPageMetaRecord from '../support/getPageMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getPageSchemaRecord = (editor, page) => {
  const pageSchemaRecord = getPageMetaRecord(editor, page).schema;
  return isPlainRecord(pageSchemaRecord) ? pageSchemaRecord : {};
};

export default getPageSchemaRecord;
