import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getSiteSeoRecord = (editor) => {
  const siteSeoRecord = getSiteMetaRecord(editor).seo;
  return isPlainRecord(siteSeoRecord) ? siteSeoRecord : {};
};

export default getSiteSeoRecord;
