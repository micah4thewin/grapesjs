import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSchemaModalMarkup from './buildSchemaModalMarkup.js';
import collectFaqEntriesFromPage from './collectFaqEntriesFromPage.js';
import getPageSchemaRecord from './getPageSchemaRecord.js';
import getSiteSchemaRecord from './getSiteSchemaRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveSchemaTargetPage from './resolveSchemaTargetPage.js';
import wireSchemaModalEvents from './wireSchemaModalEvents.js';

const openSchemaManagerModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const targetPage = resolveSchemaTargetPage(editor);
  const siteSchemaRecord = getSiteSchemaRecord(editor);
  const pageSchemaRecord = getPageSchemaRecord(editor, targetPage);
  const faqEntryCount = collectFaqEntriesFromPage(editor, targetPage).length;
  const modalMarkup = buildSchemaModalMarkup(siteSchemaRecord, pageSchemaRecord, faqEntryCount);
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, modalMarkup);
  if (!rootElement) return;
  wireSchemaModalEvents(editor, rootElement);
  openThemedModal(editor, 'Structured data manager', rootElement, { className: 'gjs-db-schema-modal-dialog' });
};

export default openSchemaManagerModal;
