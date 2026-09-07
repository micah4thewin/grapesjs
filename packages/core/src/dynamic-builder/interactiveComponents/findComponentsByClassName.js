import walkComponentTree from '../support/walkComponentTree.js';

const findComponentsByClassName = (rootComponent, className) => {
  const matchingComponents = [];
  walkComponentTree(rootComponent, (currentComponent) => {
    if (currentComponent === rootComponent || typeof currentComponent.getClasses !== 'function') return;
    if (currentComponent.getClasses().indexOf(className) >= 0) matchingComponents.push(currentComponent);
  });
  return matchingComponents;
};

export default findComponentsByClassName;
