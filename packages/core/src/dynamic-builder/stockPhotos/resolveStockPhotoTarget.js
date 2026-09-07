import findFigureCaptionComponent from './findFigureCaptionComponent.js';

const imageTypeNames = ['db-image', 'image'];

const readComponentType = (component) => (component && component.get ? String(component.get('type') || '') : '');

const findImageChild = (parentComponent) => {
  if (!parentComponent || !parentComponent.components) return null;
  const childComponents = parentComponent.components();
  const childList = childComponents && childComponents.models ? childComponents.models : childComponents || [];
  return childList.find((childComponent) => imageTypeNames.indexOf(readComponentType(childComponent)) >= 0) || null;
};

const resolveStockPhotoTarget = (editor) => {
  const selectedComponent = editor && editor.getSelected ? editor.getSelected() : null;
  if (!selectedComponent) return null;
  if (imageTypeNames.indexOf(readComponentType(selectedComponent)) >= 0) return selectedComponent;
  if (findFigureCaptionComponent(selectedComponent)) return findImageChild(selectedComponent);
  return null;
};

export default resolveStockPhotoTarget;
