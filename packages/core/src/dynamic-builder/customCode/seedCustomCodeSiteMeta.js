import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import resolveCustomCodeSettings from './resolveCustomCodeSettings.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const seedCustomCodeSiteMeta = (editor, moduleOptions) => {
  const siteMetaRecord = getSiteMetaRecord(editor);
  if (isPlainRecord(siteMetaRecord.customCode)) return;
  updateSiteMetaRecord(editor, { customCode: resolveCustomCodeSettings(editor, moduleOptions) });
};

export default seedCustomCodeSiteMeta;
