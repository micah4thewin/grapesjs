import deepMergeRecords from './deepMergeRecords.js';
import getSiteMetaRecord from './getSiteMetaRecord.js';

const updateSiteMetaRecord = (editor, metaPatch) => {
  const mergedMeta = deepMergeRecords(getSiteMetaRecord(editor), metaPatch);
  editor.getModel().set('dbSiteMeta', mergedMeta);
  editor.trigger('db:site-meta:update', mergedMeta);
  return mergedMeta;
};

export default updateSiteMetaRecord;
