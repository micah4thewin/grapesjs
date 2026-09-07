import activateSeoModalTab from './activateSeoModalTab.js';
import collectSeoModalValues from './collectSeoModalValues.js';
import resolveSeoModalPage from './resolveSeoModalPage.js';
import showToastNotice from '../support/showToastNotice.js';
import updatePageMetaRecord from '../support/updatePageMetaRecord.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const saveSeoModalValues = (editor, rootElement, refreshLiveFeedback) => {
  const blockingErrors = refreshLiveFeedback({ showAll: true });
  if (blockingErrors.length) {
    const firstError = blockingErrors[0];
    const sectionElement = firstError.fieldElement.closest('[data-db-seo-section]');
    if (sectionElement) activateSeoModalTab(rootElement, sectionElement.dataset.dbSeoSection);
    if (firstError.fieldElement.focus) firstError.fieldElement.focus();
    const fieldWord = blockingErrors.length === 1 ? 'field' : 'fields';
    showToastNotice(editor, 'Fix the highlighted ' + fieldWord + ' before saving.', { kind: 'warning' });
    return false;
  }
  const { siteValues, pageValues } = collectSeoModalValues(rootElement);
  const targetPage = resolveSeoModalPage(editor, rootElement);
  updateSiteMetaRecord(editor, { seo: siteValues });
  updatePageMetaRecord(editor, { seo: pageValues, updatedAt: new Date().toISOString() }, targetPage);
  rootElement.dataset.dbSeoResolved = 'true';
  editor.Modal.close();
  showToastNotice(editor, 'SEO settings saved', { kind: 'success' });
  editor.trigger('db:seo:saved', { page: targetPage, siteValues, pageValues });
  return true;
};

export default saveSeoModalValues;
