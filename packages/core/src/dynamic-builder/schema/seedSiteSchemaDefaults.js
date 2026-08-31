import deepMergeRecords from '../support/deepMergeRecords.js';
import getSiteSchemaRecord from './getSiteSchemaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const seedSiteSchemaDefaults = (editor, moduleOptions) => {
  const providedDefaults = isPlainRecord(moduleOptions.siteDefaults) ? moduleOptions.siteDefaults : {};
  if (!Object.keys(providedDefaults).length) return;
  updateSiteMetaRecord(editor, { schema: deepMergeRecords(providedDefaults, getSiteSchemaRecord(editor)) });
};

export default seedSiteSchemaDefaults;
