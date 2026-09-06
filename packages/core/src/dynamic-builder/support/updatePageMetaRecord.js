import deepMergeRecords from './deepMergeRecords.js';
import getPageMetaRecord from './getPageMetaRecord.js';
import markEditorChanged from './markEditorChanged.js';

const updatePageMetaRecord = (editor, metaPatch, page) => {
  const targetPage = page || (editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected());
  if (!targetPage) return {};
  const mergedMeta = deepMergeRecords(getPageMetaRecord(editor, targetPage), metaPatch);
  targetPage.set('dbPageMeta', mergedMeta);
  markEditorChanged(editor, { pageMeta: mergedMeta });
  editor.trigger('db:page-meta:update', { page: targetPage, meta: mergedMeta });
  return mergedMeta;
};

export default updatePageMetaRecord;
