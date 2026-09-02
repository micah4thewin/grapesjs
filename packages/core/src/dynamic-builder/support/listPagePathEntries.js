import getPageMetaRecord from './getPageMetaRecord.js';
import isPlainRecord from './isPlainRecord.js';
import toSlugText from './toSlugText.js';

const resolvePreferredBaseName = (editor, page, pageIndex) => {
  const pageSeoValue = getPageMetaRecord(editor, page).seo;
  const pageSeoRecord = isPlainRecord(pageSeoValue) ? pageSeoValue : {};
  const slugFromSeo = toSlugText(pageSeoRecord.slug);
  if (slugFromSeo) return slugFromSeo;
  const pageName = page && page.getName ? page.getName() : '';
  return toSlugText(pageName) || 'page-' + (pageIndex + 1);
};

const listPagePathEntries = (editor) => {
  const pagesModule = editor.Pages;
  const pageList = pagesModule && pagesModule.getAll ? pagesModule.getAll() : [];
  const mainPage = pagesModule && pagesModule.getMain ? pagesModule.getMain() : null;
  const usedNames = ['index'];
  return pageList.map((sitePage, pageIndex) => {
    const isMainPage = Boolean(
      sitePage && mainPage && sitePage.getId && mainPage.getId && sitePage.getId() === mainPage.getId(),
    );
    if (isMainPage) {
      return { page: sitePage, pageId: String(sitePage.getId ? sitePage.getId() : ''), baseName: 'index', isMainPage };
    }
    const preferredName = resolvePreferredBaseName(editor, sitePage, pageIndex);
    let uniqueName = preferredName;
    let nameSuffix = 2;
    while (usedNames.indexOf(uniqueName) >= 0) {
      uniqueName = preferredName + '-' + nameSuffix;
      nameSuffix += 1;
    }
    usedNames.push(uniqueName);
    return { page: sitePage, pageId: String(sitePage.getId ? sitePage.getId() : ''), baseName: uniqueName, isMainPage };
  });
};

export default listPagePathEntries;
