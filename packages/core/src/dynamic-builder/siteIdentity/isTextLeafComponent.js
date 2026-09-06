const isTextLeafComponent = (component) => {
  const childModels = component && component.components ? component.components().models : [];
  return childModels.every((childComponent) => String(childComponent.get('type') || '') === 'textnode');
};

export default isTextLeafComponent;
