import deepMergeRecords from '../support/deepMergeRecords.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const seedSiteSeoDefaults = (editor, moduleOptions) => {
  const providedDefaults = isPlainRecord(moduleOptions.siteDefaults) ? moduleOptions.siteDefaults : {};
  if (!Object.keys(providedDefaults).length) return;
  updateSiteMetaRecord(editor, { seo: deepMergeRecords(providedDefaults, getSiteSeoRecord(editor)) });
};

export default seedSiteSeoDefaults;
