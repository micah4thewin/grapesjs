import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSiteIdentityFormMarkup from './buildSiteIdentityFormMarkup.js';
import getSiteIdentityRecord from './getSiteIdentityRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import wireSiteIdentityForm from './wireSiteIdentityForm.js';

const openSiteIdentityModal = (editor, designTokenOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const formElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildSiteIdentityFormMarkup(getSiteIdentityRecord(editor)),
  );
  if (!formElement) return;
  wireSiteIdentityForm(editor, designTokenOptions, formElement);
  openThemedModal(editor, 'Site identity and colours', formElement, { className: 'gjs-db-identity-modal' });
  setTimeout(() => {
    const firstInput = formElement.querySelector('input[name="siteName"]');
    if (firstInput) firstInput.focus();
  }, 60);
};

export default openSiteIdentityModal;
