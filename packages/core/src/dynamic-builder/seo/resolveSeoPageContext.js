import resolvePagePathEntry from '../support/resolvePagePathEntry.js';
import resolveTargetPage from './resolveTargetPage.js';

const resolveSeoPageContext = (editor, page) => {
  const targetPage = resolveTargetPage(editor, page);
  const pathEntry = targetPage ? resolvePagePathEntry(editor, targetPage) : null;
  const pageName = targetPage && targetPage.getName ? String(targetPage.getName() || '').trim() : '';
  return { page: targetPage, pageName, isMainPage: Boolean(pathEntry && pathEntry.isMainPage) };
};

export default resolveSeoPageContext;
