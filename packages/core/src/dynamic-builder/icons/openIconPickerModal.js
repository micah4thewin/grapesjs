import buildElementFromMarkup from '../support/buildElementFromMarkup.js';
import buildIconPickerModalMarkup from './buildIconPickerModalMarkup.js';
import openThemedModal from '../support/openThemedModal.js';
import wireIconPickerEvents from './wireIconPickerEvents.js';

const openIconPickerModal = (editor, selectedIconName, handleIconSelected) => {
  const containerElement = editor.getContainer && editor.getContainer();
  if (!containerElement || !containerElement.ownerDocument) return;
  const pickerElement = buildElementFromMarkup(
    containerElement.ownerDocument,
    buildIconPickerModalMarkup(selectedIconName),
  );
  if (!pickerElement) return;
  const searchElement = wireIconPickerEvents(pickerElement, selectedIconName, (chosenIconName) => {
    handleIconSelected(chosenIconName);
    editor.Modal.close();
  });
  openThemedModal(editor, 'Choose an icon', pickerElement, { className: 'gjs-db-icon-picker-modal' });
  setTimeout(() => searchElement && searchElement.focus(), 60);
};

export default openIconPickerModal;
