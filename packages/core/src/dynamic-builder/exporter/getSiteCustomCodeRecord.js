import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getSiteCustomCodeRecord = (editor) => {
  const storedValue = getSiteMetaRecord(editor).customCode;
  const storedRecord = isPlainRecord(storedValue) ? storedValue : {};
  return {
    headHtml: String(storedRecord.headHtml || ''),
    bodyStartHtml: String(storedRecord.bodyStartHtml || ''),
    bodyEndHtml: String(storedRecord.bodyEndHtml || ''),
    allowScripts: storedRecord.allowScripts === true,
    scriptOriginAllowlist: Array.isArray(storedRecord.scriptOriginAllowlist) ? storedRecord.scriptOriginAllowlist : [],
  };
};

export default getSiteCustomCodeRecord;
