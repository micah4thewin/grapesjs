import serializeComponentDefinition from './serializeComponentDefinition.js';
import stripDefinitionElementIds from './stripDefinitionElementIds.js';

const captureSymbolLeafDefinition = (leafComponent) => {
  const leafDefinition = serializeComponentDefinition(leafComponent);
  return leafDefinition ? stripDefinitionElementIds(leafDefinition) : null;
};

export default captureSymbolLeafDefinition;
