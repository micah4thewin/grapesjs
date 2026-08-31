import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getSiteSchemaRecord = (editor) => {
  const siteSchemaRecord = getSiteMetaRecord(editor).schema;
  return isPlainRecord(siteSchemaRecord) ? siteSchemaRecord : {};
};

export default getSiteSchemaRecord;
