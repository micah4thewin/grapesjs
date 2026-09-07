import markTemplatePlaceholderCopy from './markTemplatePlaceholderCopy.js';

const buildBuiltInTemplateRecords = (kindName, definitionRecords) =>
  definitionRecords.map((definitionRecord) => ({
    templateId: definitionRecord.templateId,
    name: definitionRecord.name,
    description: definitionRecord.description,
    categoryId: definitionRecord.categoryId,
    kind: kindName,
    source: 'builtIn',
    content: markTemplatePlaceholderCopy(definitionRecord.buildContent()),
  }));

export default buildBuiltInTemplateRecords;
