import walkComponentTree from '../support/walkComponentTree.js';

const findFieldControlComponent = (rootComponent) => {
  const controlTagNames = ['input', 'select', 'textarea'];
  let matchedComponent = null;
  walkComponentTree(rootComponent, (visitedComponent) => {
    if (matchedComponent || visitedComponent === rootComponent || !visitedComponent.get) return;
    const visitedTagName = String(visitedComponent.get('tagName') || '').toLowerCase();
    if (controlTagNames.indexOf(visitedTagName) >= 0) matchedComponent = visitedComponent;
  });
  return matchedComponent;
};

export default findFieldControlComponent;
