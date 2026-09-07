import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildSiteWizardFormMarkup from './buildSiteWizardFormMarkup.js';
import collectSiteWizardValues from './collectSiteWizardValues.js';
import createSiteSkeleton from './createSiteSkeleton.js';
import getEditorInstanceSuffix from './getEditorInstanceSuffix.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import openThemedModal from '../support/openThemedModal.js';
import showToastNotice from '../support/showToastNotice.js';
import writeShellPreference from './writeShellPreference.js';

const openSiteWizardModal = (editor, pluginOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const identityRecord = getSiteMetaRecord(editor).identity || {};
  const inputId = 'db-site-wizard' + getEditorInstanceSuffix(editor);
  const formMarkup = buildSiteWizardFormMarkup(inputId, String(identityRecord.siteName || ''));
  const formElement = buildElementFromMarkup(containerElement.ownerDocument, formMarkup);
  if (!formElement) return;
  const markWizardDone = () => writeShellPreference(editor, pluginOptions, 'site-wizard', 'done');
  formElement.querySelector('[data-db-wizard-skip]').addEventListener('click', () => {
    markWizardDone();
    editor.Modal.close();
  });
  formElement.querySelector('[data-db-wizard-create]').addEventListener('click', () => {
    const wizardValues = collectSiteWizardValues(formElement);
    const nameInput = formElement.querySelector('[data-db-wizard-name]');
    if (!wizardValues.siteName) {
      nameInput.classList.add('gjs-db-field-invalid');
      nameInput.focus();
      return;
    }
    markWizardDone();
    editor.Modal.close();
    const skeletonResult = createSiteSkeleton(editor, pluginOptions, wizardValues);
    if (!skeletonResult) return;
    const pageWord = skeletonResult.pageCount === 1 ? 'page' : 'pages';
    showToastNotice(
      editor,
      `${wizardValues.siteName} is ready: ${skeletonResult.pageCount} ${pageWord} with linked navigation and footer.`,
      {
        kind: 'success',
        duration: 6000,
      },
    );
  });
  openThemedModal(editor, 'Set up your site', formElement, { className: 'gjs-db-site-wizard-modal' });
  setTimeout(() => {
    const nameInput = formElement.querySelector('[data-db-wizard-name]');
    nameInput && nameInput.focus();
  }, 50);
};

export default openSiteWizardModal;
