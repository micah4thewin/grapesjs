import getPageMetaRecord from '../support/getPageMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getPageSeoRecord = (editor, page) => {
  const pageSeoRecord = getPageMetaRecord(editor, page).seo;
  return isPlainRecord(pageSeoRecord) ? pageSeoRecord : {};
};

export default getPageSeoRecord;
