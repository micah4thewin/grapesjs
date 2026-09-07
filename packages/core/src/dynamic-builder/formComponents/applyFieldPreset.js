import ensureFieldControlId from './ensureFieldControlId.js';
import findFieldControlComponent from './findFieldControlComponent.js';
import getFieldPresetRecords from './getFieldPresetRecords.js';
import inferFieldKind from './inferFieldKind.js';
import syncFormFieldRequiredFromAttribute from './syncFormFieldRequiredFromAttribute.js';

const applyFieldPreset = (fieldComponent) => {
  if (!fieldComponent || !fieldComponent.is || !fieldComponent.is('db-form-field')) return;
  const presetRecords = getFieldPresetRecords();
  const fieldAttributes = fieldComponent.getAttributes();
  const nextRecord = presetRecords.find((candidate) => candidate.id === fieldAttributes['data-db-field-kind']);
  if (!nextRecord || !nextRecord.controlDefinition || nextRecord.id === inferFieldKind(fieldComponent)) return;
  const previousRecord = presetRecords.find((candidate) => candidate.id === inferFieldKind(fieldComponent));
  const controlComponent = findFieldControlComponent(fieldComponent);
  const nextAttributes = {};
  const currentLabel = String(fieldAttributes['data-db-label'] || '');
  const labelIsDefault =
    !currentLabel || currentLabel === 'Field label' || (previousRecord && currentLabel === previousRecord.labelText);
  if (labelIsDefault) nextAttributes['data-db-label'] = nextRecord.labelText;
  const currentHelp = String(fieldAttributes['data-db-help'] || '');
  const helpIsDefault = !currentHelp || (previousRecord && currentHelp === previousRecord.helpText);
  if (helpIsDefault) nextAttributes['data-db-help'] = nextRecord.helpText || '';
  if (controlComponent) controlComponent.replaceWith(nextRecord.controlDefinition);
  else fieldComponent.append(nextRecord.controlDefinition, { at: 1 });
  if (Object.keys(nextAttributes).length) fieldComponent.addAttributes(nextAttributes);
  syncFormFieldRequiredFromAttribute(fieldComponent);
  ensureFieldControlId(fieldComponent);
};

export default applyFieldPreset;
