import resolveSymbolIdOfComponent from '../symbols/resolveSymbolIdOfComponent.js';

const splitHomeSymbolChildren = (homePage) => {
  const mainComponent = homePage && homePage.getMainComponent ? homePage.getMainComponent() : null;
  const childComponents = mainComponent && mainComponent.components ? mainComponent.components().models : [];
  const isSymbolChild = (childComponent) =>
    childComponent.get('type') === 'db-symbol' && Boolean(resolveSymbolIdOfComponent(childComponent));
  let leadingCount = 0;
  while (leadingCount < childComponents.length && isSymbolChild(childComponents[leadingCount])) leadingCount += 1;
  let trailingStart = childComponents.length;
  while (trailingStart > leadingCount && isSymbolChild(childComponents[trailingStart - 1])) trailingStart -= 1;
  return {
    topSymbolIds: childComponents.slice(0, leadingCount).map(resolveSymbolIdOfComponent),
    bottomSymbolIds: childComponents.slice(trailingStart).map(resolveSymbolIdOfComponent),
  };
};

export default splitHomeSymbolChildren;
