const ensureFormStatusChild = (formComponent) => {
  if (!formComponent || !formComponent.is || !formComponent.is('db-form')) return;
  const childModels = formComponent.components().models;
  const statusIndex = childModels.findIndex((childComponent) => childComponent.getAttributes()['data-db-form-status']);
  if (statusIndex >= 0 && childModels[statusIndex].is('db-form-status')) return;
  if (statusIndex >= 0) {
    childModels[statusIndex].replaceWith({ type: 'db-form-status' });
    return;
  }
  formComponent.append({ type: 'db-form-status' });
};

export default ensureFormStatusChild;
