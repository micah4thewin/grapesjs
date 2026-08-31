import getPageMetaRecord from '../support/getPageMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import toSlugText from '../support/toSlugText.js';

const resolveSchemaPageSlug = (editor, page) => {
  if (!page) return '';
  const pageSeoRecord = getPageMetaRecord(editor, page).seo;
  const seoSlug = isPlainRecord(pageSeoRecord) ? pageSeoRecord.slug : '';
  if (seoSlug) return toSlugText(seoSlug);
  const pagesModule = editor.Pages;
  const mainPage = pagesModule && pagesModule.getMain && pagesModule.getMain();
  if (mainPage && mainPage === page) return '';
  return toSlugText(page.getName ? page.getName() : '');
};

export default resolveSchemaPageSlug;
