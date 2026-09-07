import getPageMetaRecord from '../support/getPageMetaRecord.js';

const resolvePageLastModifiedDate = (editor, page) => {
  const updatedAtValue = getPageMetaRecord(editor, page).updatedAt;
  const parsedTime = Date.parse(String(updatedAtValue || ''));
  if (Number.isNaN(parsedTime)) return '';
  return new Date(parsedTime).toISOString().slice(0, 10);
};

export default resolvePageLastModifiedDate;
