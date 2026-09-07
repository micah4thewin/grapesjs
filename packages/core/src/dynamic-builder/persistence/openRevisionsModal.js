import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildRevisionsModalMarkup from './buildRevisionsModalMarkup.js';
import buildStorageUsageText from './buildStorageUsageText.js';
import focusFirstModalControl from '../support/focusFirstModalControl.js';
import handleRevisionListClick from './handleRevisionListClick.js';
import importRevisionFile from './importRevisionFile.js';
import listRestorableRecords from './listRestorableRecords.js';
import openThemedModal from '../support/openThemedModal.js';
import renderRevisionListElement from './renderRevisionListElement.js';

const openRevisionsModal = (editor, moduleOptions) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const rootElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildRevisionsModalMarkup(buildStorageUsageText(editor, moduleOptions)),
  );
  if (!rootElement) return;
  const listElement = rootElement.querySelector('[data-db-revision-list]');
  const usageElement = rootElement.querySelector('[data-db-storage-usage]');
  const refreshRevisionList = () => {
    renderRevisionListElement(listElement, listRestorableRecords(editor, moduleOptions));
    if (usageElement) usageElement.textContent = buildStorageUsageText(editor, moduleOptions);
  };
  refreshRevisionList();
  rootElement.addEventListener('click', (clickEvent) =>
    handleRevisionListClick(editor, moduleOptions, clickEvent, refreshRevisionList),
  );
  const importInputElement = rootElement.querySelector('[data-db-revision-import-input]');
  if (importInputElement) {
    importInputElement.addEventListener('change', () => {
      const selectedFile = importInputElement.files && importInputElement.files[0];
      if (!selectedFile) return;
      importRevisionFile(editor, moduleOptions, selectedFile).then(() => {
        importInputElement.value = '';
        refreshRevisionList();
      });
    });
  }
  openThemedModal(editor, 'Project revisions', rootElement, { className: 'gjs-db-revisions-modal' });
  focusFirstModalControl(rootElement);
};

export default openRevisionsModal;
