import walkComponentTree from '../support/walkComponentTree.js';

const findDescendantByAttributeName = (rootComponent, attributeName) => {
  let matchedComponent = null;
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (matchedComponent || visitedComponent === rootComponent || !visitedComponent.getAttributes) return;
    if (visitedComponent.getAttributes()[attributeName]) matchedComponent = visitedComponent;
  });
  return matchedComponent;
};

export default findDescendantByAttributeName;
