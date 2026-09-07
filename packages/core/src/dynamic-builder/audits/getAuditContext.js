import getPageMetaRecord from '../support/getPageMetaRecord.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import resolveAuditRootElement from './resolveAuditRootElement.js';

const getAuditContext = (editor, moduleOptions, page) => {
  const pagesModule = editor.Pages;
  const selectedPage = (pagesModule && pagesModule.getSelected && pagesModule.getSelected()) || null;
  const targetPage = page || selectedPage;
  const usesCanvas = !page || page === selectedPage;
  const canvasModule = editor.Canvas;
  const canvasDocument = usesCanvas && canvasModule && canvasModule.getDocument ? canvasModule.getDocument() : null;
  const canvasWindow = usesCanvas && canvasModule && canvasModule.getWindow ? canvasModule.getWindow() : null;
  const canvasBody = (canvasDocument && canvasDocument.body) || null;
  const wrapperComponent = usesCanvas
    ? (editor.getWrapper && editor.getWrapper()) || null
    : (targetPage && targetPage.getMainComponent && targetPage.getMainComponent()) || null;
  const pageName = targetPage && targetPage.getName ? String(targetPage.getName() || '').trim() : '';
  return {
    editor,
    moduleOptions: moduleOptions || {},
    page: targetPage,
    pageId: targetPage && targetPage.getId ? String(targetPage.getId()) : '',
    pageName: pageName || (targetPage ? 'Home' : ''),
    canvasDocument,
    canvasWindow,
    canvasBody,
    canvasRoot: resolveAuditRootElement(wrapperComponent, canvasBody),
    wrapperComponent,
    siteMeta: getSiteMetaRecord(editor),
    pageMeta: getPageMetaRecord(editor, targetPage),
    includeSiteWideChecks: true,
  };
};

export default getAuditContext;
