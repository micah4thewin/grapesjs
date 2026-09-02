import activateSeoModalTab from './activateSeoModalTab.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSeoModalMarkup from './buildSeoModalMarkup.js';
import getPageSeoRecord from './getPageSeoRecord.js';
import getSiteSeoRecord from './getSiteSeoRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import wireSeoModalEvents from './wireSeoModalEvents.js';

const openSeoSettingsModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const siteSeoRecord = getSiteSeoRecord(editor);
  const pageSeoRecord = getPageSeoRecord(editor);
  const modalMarkup = buildSeoModalMarkup(siteSeoRecord, pageSeoRecord);
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, modalMarkup);
  if (!rootElement) return;
  const storedTabName = editor.getModel().get('dbSeoActiveTab');
  activateSeoModalTab(rootElement, storedTabName === 'page' ? 'page' : 'site');
  wireSeoModalEvents(editor, rootElement);
  openThemedModal(editor, 'SEO settings', rootElement, { className: 'gjs-db-seo-modal-dialog' });
};

export default openSeoSettingsModal;
