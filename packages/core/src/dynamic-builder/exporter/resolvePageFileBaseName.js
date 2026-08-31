import getPageMetaRecord from '../support/getPageMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import toSlugText from '../support/toSlugText.js';

const resolvePageFileBaseName = (editor, page) => {
  const pagesModule = editor.Pages;
  const mainPage = pagesModule && pagesModule.getMain ? pagesModule.getMain() : null;
  if (page && mainPage && page.getId && mainPage.getId && page.getId() === mainPage.getId()) return 'index';
  const pageSeoValue = getPageMetaRecord(editor, page).seo;
  const pageSeoRecord = isPlainRecord(pageSeoValue) ? pageSeoValue : {};
  const slugFromSeo = toSlugText(pageSeoRecord.slug);
  if (slugFromSeo) return slugFromSeo;
  const pageName = page && page.getName ? page.getName() : '';
  return toSlugText(pageName) || 'page';
};

export default resolvePageFileBaseName;
