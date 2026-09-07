import normalizeDataSourceRecord from './normalizeDataSourceRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const setDataSourcesDraft = (editor, draftRecord, options = {}) => {
  const editorModel = editor.getModel();
  const nextDraft = isPlainRecord(draftRecord) ? normalizeDataSourceRecord(draftRecord) : null;
  const previousDraft = editorModel.get('dbDataSourcesDraft') || null;
  if (JSON.stringify(previousDraft) === JSON.stringify(nextDraft)) return nextDraft;
  editorModel.set('dbDataSourcesDraft', nextDraft);
  if (!options.silent) editor.trigger('db:data-sources:update', nextDraft || editorModel.get('dbDataSources') || {});
  return nextDraft;
};

export default setDataSourcesDraft;
