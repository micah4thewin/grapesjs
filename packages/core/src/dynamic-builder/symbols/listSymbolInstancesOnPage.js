import walkComponentTree from '../support/walkComponentTree.js';

const listSymbolInstancesOnPage = (sitePage, symbolId) => {
  const matchedInstances = [];
  const targetId = symbolId === undefined ? null : String(symbolId);
  const mainComponent = sitePage && sitePage.getMainComponent ? sitePage.getMainComponent() : null;
  walkComponentTree(mainComponent, (currentComponent) => {
    if (!currentComponent.get || currentComponent.get('type') !== 'db-symbol') return;
    const attributesRecord = currentComponent.getAttributes ? currentComponent.getAttributes() : {};
    if (targetId !== null && String(attributesRecord['data-db-symbol'] || '') !== targetId) return;
    matchedInstances.push(currentComponent);
  });
  return matchedInstances;
};

export default listSymbolInstancesOnPage;
