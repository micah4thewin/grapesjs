import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSiteSettingsFormMarkup from './buildSiteSettingsFormMarkup.js';
import focusFirstModalControl from '../support/focusFirstModalControl.js';
import getSiteSeoMetaRecord from './getSiteSeoMetaRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import saveSiteSettingsRecord from './saveSiteSettingsRecord.js';

const openSiteSettingsModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const formMarkup = buildSiteSettingsFormMarkup(getSiteSeoMetaRecord(editor));
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!rootElement) return;
  const saveButtonElement = rootElement.querySelector('[data-db-site-save]');
  if (saveButtonElement) {
    saveButtonElement.addEventListener('click', () => {
      if (saveSiteSettingsRecord(editor, rootElement)) editor.Modal.close();
    });
  }
  rootElement.addEventListener('keydown', (keyEvent) => {
    if (keyEvent.key !== 'Enter' || !keyEvent.target || keyEvent.target.tagName !== 'INPUT') return;
    keyEvent.preventDefault();
    if (saveSiteSettingsRecord(editor, rootElement)) editor.Modal.close();
  });
  openThemedModal(editor, 'Site settings', rootElement, { className: 'gjs-db-site-settings-modal' });
  focusFirstModalControl(rootElement);
};

export default openSiteSettingsModal;
