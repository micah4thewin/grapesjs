import buildControlId from './buildControlId.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import findFieldControlComponent from './findFieldControlComponent.js';

const ensureFieldControlId = (fieldComponent) => {
  if (!fieldComponent || !fieldComponent.is || !fieldComponent.is('db-form-field')) return;
  const controlComponent = findFieldControlComponent(fieldComponent);
  if (!controlComponent) return;
  const controlAttributes = controlComponent.getAttributes();
  const controlId = String(controlAttributes.id || '') || buildControlId(controlAttributes.name);
  if (!controlAttributes.id) controlComponent.addAttributes({ id: controlId });
  const labelComponent = findDescendantByAttributeName(fieldComponent, 'data-db-field-label');
  if (labelComponent && labelComponent.getAttributes().for !== controlId)
    labelComponent.addAttributes({ for: controlId });
  const helpComponent = findDescendantByAttributeName(fieldComponent, 'data-db-field-help');
  const helpId = controlId + '-help';
  if (helpComponent && helpComponent.getAttributes().id !== helpId) helpComponent.addAttributes({ id: helpId });
  const describedIds = String(controlAttributes['aria-describedby'] || '')
    .split(/\s+/)
    .filter((idText) => idText && !idText.endsWith('-help'));
  if (helpComponent) describedIds.push(helpId);
  const nextDescribedBy = describedIds.join(' ');
  if (nextDescribedBy && nextDescribedBy !== controlAttributes['aria-describedby'])
    controlComponent.addAttributes({ 'aria-describedby': nextDescribedBy });
  if (!nextDescribedBy && controlAttributes['aria-describedby'])
    controlComponent.removeAttributes(['aria-describedby']);
};

export default ensureFieldControlId;
