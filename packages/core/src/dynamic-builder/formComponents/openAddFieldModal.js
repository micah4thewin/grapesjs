import openThemedModal from '../support/openThemedModal.js';
import showToastNotice from '../support/showToastNotice.js';
import buildAddFieldModalMarkup from './buildAddFieldModalMarkup.js';
import getFieldPresetRecords from './getFieldPresetRecords.js';
import insertFieldPreset from './insertFieldPreset.js';

const openAddFieldModal = (editor, selectedComponent) => {
  const targetComponent = selectedComponent || editor.getSelected();
  const formComponent =
    targetComponent && targetComponent.closestType ? targetComponent.closestType('db-form') || targetComponent : null;
  if (!formComponent || !formComponent.is || !formComponent.is('db-form')) {
    showToastNotice(editor, 'Select a form first, then add a field', { kind: 'error' });
    return;
  }
  const contentElement = document.createElement('div');
  contentElement.innerHTML = buildAddFieldModalMarkup();
  contentElement.addEventListener('click', (clickEvent) => {
    const cardElement = clickEvent.target.closest ? clickEvent.target.closest('[data-db-field-preset]') : null;
    if (!cardElement) return;
    const presetId = cardElement.getAttribute('data-db-field-preset');
    const presetRecord = getFieldPresetRecords().find((candidate) => candidate.id === presetId);
    if (!presetRecord) return;
    insertFieldPreset(editor, targetComponent, presetRecord);
    editor.Modal.close();
  });
  openThemedModal(editor, 'Add a field', contentElement, { className: 'gjs-db-add-field-modal' });
};

export default openAddFieldModal;
