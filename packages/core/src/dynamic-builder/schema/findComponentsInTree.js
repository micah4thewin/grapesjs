import walkComponentTree from '../support/walkComponentTree.js';

const findComponentsInTree = (rootComponent, matchesComponent) => {
  const matchedComponents = [];
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (matchesComponent(visitedComponent)) matchedComponents.push(visitedComponent);
  });
  return matchedComponents;
};

export default findComponentsInTree;
