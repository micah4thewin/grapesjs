import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildIconPickerModalMarkup from './buildIconPickerModalMarkup.js';
import openThemedModal from '../support/openThemedModal.js';
import revealSelectedIconCell from './revealSelectedIconCell.js';
import wireIconPickerEvents from './wireIconPickerEvents.js';

const openIconPickerModal = (editor, selectedIconName, handleIconSelected) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const pickerElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildIconPickerModalMarkup(selectedIconName),
  );
  if (!pickerElement) return;
  const searchElement = wireIconPickerEvents(
    pickerElement,
    selectedIconName,
    (chosenIconName) => {
      handleIconSelected(chosenIconName);
      editor.trigger('db:icon:chosen', { iconName: chosenIconName, previousIconName: selectedIconName });
      editor.Modal.close();
    },
    () => editor.Modal.close(),
  );
  openThemedModal(editor, 'Choose an icon', pickerElement, { className: 'gjs-db-icon-picker-modal' });
  setTimeout(() => {
    if (searchElement) searchElement.focus();
    revealSelectedIconCell(pickerElement.querySelector('[data-db-icon-results]'));
  }, 60);
};

export default openIconPickerModal;
