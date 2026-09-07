import buildFieldPickerMarkup from './buildFieldPickerMarkup.js';
import collectFieldPickerEntries from './collectFieldPickerEntries.js';
import filterFieldPickerList from './filterFieldPickerList.js';
import getFieldPickerEditorCss from './getFieldPickerEditorCss.js';
import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openThemedModal from '../support/openThemedModal.js';

const openFieldPickerModal = (editor, contextComponent, onPick) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return null;
  injectEditorStylesOnce(editor, 'db-css-databinding-picker', getFieldPickerEditorCss());
  const pickerEntries = collectFieldPickerEntries(editor, contextComponent);
  const rootElement = buildElementFromMarkup(containerElement.ownerDocument, buildFieldPickerMarkup(pickerEntries));
  if (!rootElement) return null;
  const searchInput = rootElement.querySelector('[data-db-pick-search]');
  if (searchInput) searchInput.addEventListener('input', () => filterFieldPickerList(rootElement, searchInput.value));
  rootElement.addEventListener('click', (clickEvent) => {
    const pickButton = clickEvent.target.closest ? clickEvent.target.closest('[data-db-pick-token]') : null;
    if (!pickButton) return;
    editor.Modal.close();
    onPick(pickButton.getAttribute('data-db-pick-token'));
  });
  openThemedModal(editor, 'Insert a data field', rootElement, { className: 'gjs-db-field-picker-modal' });
  setTimeout(() => searchInput && searchInput.focus(), 30);
  return rootElement;
};

export default openFieldPickerModal;
