import escapeHtmlText from '../support/escapeHtmlText.js';

const buildFormFieldChildren = (labelText, controlDefinition, helpText) => {
  const childDefinitions = [
    {
      type: 'db-field-label',
      tagName: 'label',
      classes: ['db-field-label'],
      attributes: { 'data-db-field-label': 'true' },
      components: escapeHtmlText(labelText),
    },
    controlDefinition,
  ];
  if (helpText)
    childDefinitions.push({
      tagName: 'small',
      classes: ['db-field-help'],
      attributes: { 'data-db-field-help': 'true' },
      draggable: false,
      copyable: false,
      traits: [],
      components: escapeHtmlText(helpText),
    });
  return childDefinitions;
};

export default buildFormFieldChildren;
