import walkComponentTree from '../support/walkComponentTree.js';

const findDescendantByField = (rootComponent, fieldName) => {
  let matchedComponent = null;
  walkComponentTree(rootComponent, (currentComponent) => {
    if (matchedComponent || currentComponent === rootComponent || !currentComponent.getAttributes) return;
    if (currentComponent.getAttributes()['data-db-field'] === fieldName) matchedComponent = currentComponent;
  });
  return matchedComponent;
};

export default findDescendantByField;
