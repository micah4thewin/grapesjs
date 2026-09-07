import deepMergeRecords from '../support/deepMergeRecords.js';
import getPageMetaRecord from '../support/getPageMetaRecord.js';
import resolveTargetPage from './resolveTargetPage.js';

const stampPageUpdatedAt = (editor, page) => {
  const targetPage = resolveTargetPage(editor, page);
  if (!targetPage || !targetPage.set) return '';
  const updatedAt = new Date().toISOString();
  const mergedMeta = deepMergeRecords(getPageMetaRecord(editor, targetPage), { updatedAt });
  targetPage.set('dbPageMeta', mergedMeta, { avoidStore: true });
  return updatedAt;
};

export default stampPageUpdatedAt;
