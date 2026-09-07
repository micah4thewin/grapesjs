import openFieldPickerModal from './openFieldPickerModal.js';
import showToastNotice from '../support/showToastNotice.js';

const isTextLikeComponent = (component) => {
  if (!component || typeof component.get !== 'function') return false;
  const componentType = String(component.get('type') || '');
  return /text|heading|quote|button|link/.test(componentType) || Boolean(component.get('editable'));
};

const runInsertDataFieldCommand = (editor) => {
  const selectedComponent = editor.getSelected ? editor.getSelected() : null;
  if (!isTextLikeComponent(selectedComponent)) {
    showToastNotice(editor, 'Select a text element first, then insert a data field.', { kind: 'warning' });
    return false;
  }
  openFieldPickerModal(editor, selectedComponent, (tokenText) => {
    const currentText = selectedComponent.getInnerHTML ? selectedComponent.getInnerHTML() : '';
    const separatorText = currentText && !/\s$/.test(currentText) ? ' ' : '';
    selectedComponent.components(currentText + separatorText + tokenText);
    editor.select(selectedComponent);
  });
  return true;
};

export default runInsertDataFieldCommand;
