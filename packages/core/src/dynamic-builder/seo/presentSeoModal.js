import focusSeoField from './focusSeoField.js';
import guardSeoModalClose from './guardSeoModalClose.js';
import openSeoUnsavedChangesModal from './openSeoUnsavedChangesModal.js';
import openThemedModal from '../support/openThemedModal.js';

const presentSeoModal = (editor, rootElement, refreshLiveFeedback) => {
  delete rootElement.dataset.dbSeoResolved;
  openThemedModal(editor, 'SEO settings', rootElement, { className: 'gjs-db-seo-modal-dialog' });
  const reopenAfterDetour = () => {
    const pickedFieldKey = rootElement.dataset.dbSeoPicking === 'true' ? rootElement.dataset.dbSeoFocusField : '';
    delete rootElement.dataset.dbSeoPicking;
    presentSeoModal(editor, rootElement, refreshLiveFeedback);
    refreshLiveFeedback();
    if (pickedFieldKey) focusSeoField(rootElement, pickedFieldKey);
  };
  guardSeoModalClose(editor, rootElement, reopenAfterDetour, () =>
    openSeoUnsavedChangesModal(editor, rootElement, refreshLiveFeedback, reopenAfterDetour),
  );
  const activeTabButton = rootElement.querySelector('[data-db-seo-tab][aria-selected="true"]');
  if (activeTabButton && activeTabButton.focus) setTimeout(() => activeTabButton.focus(), 60);
};

export default presentSeoModal;
