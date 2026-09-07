import walkComponentTree from '../support/walkComponentTree.js';

const listComponentsMatching = (rootComponent, matcherRecord) => {
  const matchedComponents = [];
  walkComponentTree(rootComponent, (currentComponent) => {
    if (currentComponent === rootComponent || !currentComponent.getAttributes) return;
    if (matcherRecord.className) {
      const classNames = currentComponent.getClasses ? currentComponent.getClasses() : [];
      if (classNames.indexOf(matcherRecord.className) < 0) return;
    }
    if (matcherRecord.attributeName) {
      const attributeValue = currentComponent.getAttributes()[matcherRecord.attributeName];
      if (attributeValue === undefined || attributeValue === null) return;
      if (matcherRecord.attributeValue !== undefined && String(attributeValue) !== matcherRecord.attributeValue) return;
    }
    matchedComponents.push(currentComponent);
  });
  return matchedComponents;
};

export default listComponentsMatching;
