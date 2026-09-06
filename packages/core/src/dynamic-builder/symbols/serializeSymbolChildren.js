import serializeComponentDefinition from './serializeComponentDefinition.js';

const serializeSymbolChildren = (component) => {
  const childComponents = component && component.components ? component.components() : null;
  if (!childComponents) return [];
  return childComponents.map((childComponent) => serializeComponentDefinition(childComponent)).filter(Boolean);
};

export default serializeSymbolChildren;
