const resolveLabelOwnerRecord = (labelComponent) => {
  if (!labelComponent || !labelComponent.getAttributes || !labelComponent.closestType) return null;
  const labelAttributes = labelComponent.getAttributes();
  if (labelAttributes['data-db-field-label'])
    return { ownerComponent: labelComponent.closestType('db-form-field'), attributeName: 'data-db-label' };
  if (labelAttributes['data-db-choice-text'])
    return { ownerComponent: labelComponent.closestType('db-checkbox'), attributeName: 'data-db-label' };
  if (labelAttributes['data-db-radio-legend']) {
    const ownerComponent = labelComponent.closestType('db-radio-group') || labelComponent.closestType('db-form-step');
    return { ownerComponent, attributeName: 'data-db-legend' };
  }
  return null;
};

export default resolveLabelOwnerRecord;
