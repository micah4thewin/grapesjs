import deepMergeRecords from './deepMergeRecords.js';
import getSiteMetaRecord from './getSiteMetaRecord.js';
import markEditorChanged from './markEditorChanged.js';

const updateSiteMetaRecord = (editor, metaPatch) => {
  const mergedMeta = deepMergeRecords(getSiteMetaRecord(editor), metaPatch);
  editor.getModel().set('dbSiteMeta', mergedMeta);
  markEditorChanged(editor, { siteMeta: mergedMeta });
  editor.trigger('db:site-meta:update', mergedMeta);
  return mergedMeta;
};

export default updateSiteMetaRecord;
