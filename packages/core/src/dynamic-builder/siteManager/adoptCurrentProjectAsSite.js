import buildProjectSnapshot from '../persistence/buildProjectSnapshot.js';
import buildSiteRecord from './buildSiteRecord.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import refreshSiteRecordStats from './refreshSiteRecordStats.js';
import setCurrentSiteRecord from './setCurrentSiteRecord.js';

const resolveAdoptedSiteName = (editor) => {
  const siteMetaRecord = getSiteMetaRecord(editor);
  const seoRecord = isPlainRecord(siteMetaRecord.seo) ? siteMetaRecord.seo : {};
  return String(seoRecord.siteName || '').trim() || 'My first site';
};

const adoptCurrentProjectAsSite = (editor, managerOptions) => {
  const siteRecord = refreshSiteRecordStats(editor, buildSiteRecord({ name: resolveAdoptedSiteName(editor) }));
  setCurrentSiteRecord(editor, managerOptions, siteRecord);
  return managerOptions.storageAdapter.writeSite(siteRecord, buildProjectSnapshot(editor)).then(() => {
    editor.trigger('db:site:adopt', { site: siteRecord });
    return siteRecord;
  });
};

export default adoptCurrentProjectAsSite;
