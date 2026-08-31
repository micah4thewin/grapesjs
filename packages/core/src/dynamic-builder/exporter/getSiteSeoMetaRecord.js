import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getSiteSeoMetaRecord = (editor) => {
  const storedValue = getSiteMetaRecord(editor).seo;
  return isPlainRecord(storedValue) ? storedValue : {};
};

export default getSiteSeoMetaRecord;
