import buildDataCheckMarkup from './buildDataCheckMarkup.js';
import collectDataBindingIssues from './collectDataBindingIssues.js';
import getFieldPickerEditorCss from './getFieldPickerEditorCss.js';
import selectComponentOnPage from './selectComponentOnPage.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';

const openDataCheckModal = (editor) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  injectEditorStylesOnce(editor, 'db-css-databinding-picker', getFieldPickerEditorCss());
  const issuesRecord = collectDataBindingIssues(editor);
  const targetRecords = [];
  const rootElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildDataCheckMarkup(issuesRecord, targetRecords),
  );
  if (!rootElement) return null;
  rootElement.addEventListener('click', (clickEvent) => {
    const targetButton = clickEvent.target.closest ? clickEvent.target.closest('[data-db-check-target]') : null;
    if (targetButton) {
      const targetRecord = targetRecords[parseInt(targetButton.getAttribute('data-db-check-target'), 10)];
      editor.Modal.close();
      if (targetRecord) selectComponentOnPage(editor, targetRecord.page, targetRecord.component);
      return;
    }
    if (clickEvent.target.closest && clickEvent.target.closest('[data-db-check-open-sources]')) {
      editor.Modal.close();
      editor.runCommand('db:open-data-sources');
    }
  });
  openThemedModal(editor, 'Data check', rootElement, { className: 'gjs-db-data-check-modal' });
  return issuesRecord;
};

export default openDataCheckModal;
