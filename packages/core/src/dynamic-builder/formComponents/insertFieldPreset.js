import showToastNotice from '../support/showToastNotice.js';
import buildFieldPresetDefinition from './buildFieldPresetDefinition.js';
import ensureFieldControlId from './ensureFieldControlId.js';
import findFormInsertIndex from './findFormInsertIndex.js';

const resolveHostComponent = (selectedComponent) => {
  if (!selectedComponent || !selectedComponent.is) return null;
  if (selectedComponent.is('db-form') || selectedComponent.is('db-form-step') || selectedComponent.is('db-form-row'))
    return selectedComponent;
  const stepComponent = selectedComponent.closestType && selectedComponent.closestType('db-form-step');
  return stepComponent || (selectedComponent.closestType && selectedComponent.closestType('db-form')) || null;
};

const insertFieldPreset = (editor, selectedComponent, presetRecord) => {
  const hostComponent = resolveHostComponent(selectedComponent);
  if (!hostComponent) return null;
  const lastStep = hostComponent.is('db-form') ? hostComponent.findType('db-form-step').pop() : null;
  const targetComponent = lastStep || hostComponent;
  const insertIndex = findFormInsertIndex(targetComponent);
  const addedComponent = targetComponent.append(buildFieldPresetDefinition(presetRecord, false), {
    at: insertIndex,
  })[0];
  if (!addedComponent) return null;
  ensureFieldControlId(addedComponent);
  editor.select(addedComponent);
  showToastNotice(editor, 'Added a ' + presetRecord.label.toLowerCase() + ' field', { kind: 'success' });
  return addedComponent;
};

export default insertFieldPreset;
