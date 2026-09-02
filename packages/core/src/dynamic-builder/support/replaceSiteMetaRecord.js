import deepMergeRecords from './deepMergeRecords.js';
import isPlainRecord from './isPlainRecord.js';
import markEditorChanged from './markEditorChanged.js';

const replaceSiteMetaRecord = (editor, nextRecord, options = {}) => {
  const editorModel = editor.getModel();
  const defaultRecord = editorModel.get('dbSiteMetaDefaults');
  const baseRecord = isPlainRecord(defaultRecord) ? defaultRecord : {};
  const replacedMeta = deepMergeRecords(baseRecord, isPlainRecord(nextRecord) ? nextRecord : {});
  editorModel.set('dbSiteMeta', replacedMeta);
  if (!options.silent) markEditorChanged(editor, { siteMeta: replacedMeta });
  editor.trigger('db:site-meta:update', replacedMeta);
  return replacedMeta;
};

export default replaceSiteMetaRecord;
