import walkComponentTree from '../support/walkComponentTree.js';

const chromeTypeLabels = {
  'db-navbar': 'navigation bar',
  'db-footer': 'footer',
  'db-announcement': 'announcement bar',
};

const removeDuplicatePageChrome = (editor, addedComponents) => {
  const existingTypes = [];
  editor
    .getWrapper()
    .components()
    .forEach((rootComponent) => {
      if (addedComponents.indexOf(rootComponent) >= 0) return;
      walkComponentTree(rootComponent, (nestedComponent) => {
        const typeName = String((nestedComponent.get && nestedComponent.get('type')) || '');
        chromeTypeLabels[typeName] && existingTypes.indexOf(typeName) < 0 && existingTypes.push(typeName);
      });
    });
  const duplicateComponents = addedComponents.filter(
    (addedComponent) => existingTypes.indexOf(String(addedComponent.get('type') || '')) >= 0,
  );
  duplicateComponents.forEach((duplicateComponent) => duplicateComponent.remove());
  return duplicateComponents.map((duplicateComponent) => chromeTypeLabels[String(duplicateComponent.get('type'))]);
};

export default removeDuplicatePageChrome;
