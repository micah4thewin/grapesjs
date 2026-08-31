import getPageSeoRecord from './getPageSeoRecord.js';
import resolveTargetPage from './resolveTargetPage.js';
import toSlugText from '../support/toSlugText.js';

const resolvePageSlugText = (editor, page) => {
  const targetPage = resolveTargetPage(editor, page);
  const pageSeoRecord = getPageSeoRecord(editor, targetPage);
  if (pageSeoRecord.slug) return toSlugText(pageSeoRecord.slug);
  const pageName = targetPage && targetPage.getName ? targetPage.getName() : '';
  return toSlugText(pageName);
};

export default resolvePageSlugText;
