import serializeComponentDefinition from '../symbols/serializeComponentDefinition.js';
import stripDefinitionElementIds from '../symbols/stripDefinitionElementIds.js';

const serializeTemplateContent = (componentModels) =>
  (componentModels || [])
    .map((componentModel) => serializeComponentDefinition(componentModel))
    .filter(Boolean)
    .map((definitionRecord) => stripDefinitionElementIds(definitionRecord));

export default serializeTemplateContent;
