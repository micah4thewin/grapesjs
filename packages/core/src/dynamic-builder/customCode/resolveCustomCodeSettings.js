import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveCustomCodeSettings = (editor, moduleOptions) => {
  const siteMetaRecord = getSiteMetaRecord(editor);
  const storedRecord = isPlainRecord(siteMetaRecord.customCode) ? siteMetaRecord.customCode : {};
  const optionRecord = isPlainRecord(moduleOptions) ? moduleOptions : {};
  const storedAllowScripts = storedRecord.allowScripts;
  return {
    headHtml: String(storedRecord.headHtml || ''),
    bodyStartHtml: String(storedRecord.bodyStartHtml || ''),
    bodyEndHtml: String(storedRecord.bodyEndHtml || ''),
    allowScripts: storedAllowScripts === undefined ? optionRecord.allowScripts === true : storedAllowScripts === true,
    scriptOriginAllowlist: Array.isArray(storedRecord.scriptOriginAllowlist) ? storedRecord.scriptOriginAllowlist : [],
  };
};

export default resolveCustomCodeSettings;
