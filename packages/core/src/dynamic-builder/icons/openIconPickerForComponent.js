import openIconPickerModal from './openIconPickerModal.js';

const openIconPickerForComponent = (editor, iconComponent) => {
  const currentIconName = String(iconComponent.getAttributes()['data-db-icon-name'] || '');
  openIconPickerModal(editor, currentIconName, (chosenIconName) => {
    iconComponent.addAttributes({ 'data-db-icon-name': chosenIconName });
    editor.select(iconComponent);
  });
};

export default openIconPickerForComponent;
