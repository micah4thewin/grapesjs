import walkComponentTree from '../support/walkComponentTree.js';

const findDescendantWithAttribute = (rootComponent, attributeName) => {
  let matchedComponent = null;
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (matchedComponent || !visitedComponent.getAttributes) return;
    if (visitedComponent.getAttributes()[attributeName]) matchedComponent = visitedComponent;
  });
  return matchedComponent;
};

export default findDescendantWithAttribute;
