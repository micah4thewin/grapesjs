import getPageDisplayName from './getPageDisplayName.js';
import toSlugText from '../support/toSlugText.js';

const validatePageName = (editor, pageName, excludedPageId) => {
  const trimmedName = String(pageName || '').trim();
  if (!trimmedName) return { isValid: false, message: 'Enter a page name.' };
  const candidateSlug = toSlugText(trimmedName);
  if (!candidateSlug) {
    return { isValid: false, message: 'This name has no usable characters for a page address.' };
  }
  const mainPage = editor.Pages && editor.Pages.getMain && editor.Pages.getMain();
  const mainPageId = mainPage && mainPage.getId ? String(mainPage.getId()) : '';
  const isRenamingMainPage = excludedPageId !== '' && excludedPageId === mainPageId;
  if (candidateSlug === 'index' && !isRenamingMainPage) {
    return { isValid: false, message: 'The name "index" is reserved for the home page.' };
  }
  const allPages = (editor.Pages && editor.Pages.getAll && editor.Pages.getAll()) || [];
  const hasCollision = allPages.some((sitePage) => {
    const pageId = String(sitePage.getId ? sitePage.getId() : '');
    if (pageId === excludedPageId) return false;
    return toSlugText(getPageDisplayName(sitePage)) === candidateSlug;
  });
  if (hasCollision) return { isValid: false, message: 'Another page already uses this name.' };
  return { isValid: true, message: '' };
};

export default validatePageName;
