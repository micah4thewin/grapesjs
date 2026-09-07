import activateSchemaModalTab from './activateSchemaModalTab.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSchemaModalMarkup from './buildSchemaModalMarkup.js';
import buildSchemaPageUrl from './buildSchemaPageUrl.js';
import collectFaqEntriesFromPage from './collectFaqEntriesFromPage.js';
import getPageSchemaRecord from './getPageSchemaRecord.js';
import getSiteSchemaRecord from './getSiteSchemaRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import resolveSchemaTargetPage from './resolveSchemaTargetPage.js';
import resolveSiteSchemaFallbacks from './resolveSiteSchemaFallbacks.js';
import wireSchemaModalEvents from './wireSchemaModalEvents.js';

const schemaTabNames = ['site', 'page', 'preview'];

const openSchemaManagerModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const targetPage = resolveSchemaTargetPage(editor);
  const siteSchemaRecord = resolveSiteSchemaFallbacks(editor, getSiteSchemaRecord(editor));
  const pageSchemaRecord = getPageSchemaRecord(editor, targetPage);
  const faqEntryCount = collectFaqEntriesFromPage(editor, targetPage).length;
  const testUrl = buildSchemaPageUrl(editor, targetPage);
  const modalMarkup = buildSchemaModalMarkup(siteSchemaRecord, pageSchemaRecord, faqEntryCount, testUrl);
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, modalMarkup);
  if (!rootElement) return;
  const storedTabName = editor.getModel().get('dbSchemaActiveTab');
  activateSchemaModalTab(rootElement, schemaTabNames.includes(storedTabName) ? storedTabName : 'site');
  wireSchemaModalEvents(editor, rootElement);
  openThemedModal(editor, 'Structured data', rootElement, { className: 'gjs-db-schema-modal-dialog' });
};

export default openSchemaManagerModal;
