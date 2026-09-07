const trailingTypes = ['db-consent-checkbox', 'db-honeypot', 'db-form-steps-nav', 'db-submit-button', 'db-form-status'];

const findFormInsertIndex = (hostComponent) => {
  const childModels = hostComponent && hostComponent.components ? hostComponent.components().models : [];
  const trailingIndex = childModels.findIndex(
    (childComponent) => trailingTypes.indexOf(String(childComponent.get('type') || '')) >= 0,
  );
  return trailingIndex < 0 ? childModels.length : trailingIndex;
};

export default findFormInsertIndex;
