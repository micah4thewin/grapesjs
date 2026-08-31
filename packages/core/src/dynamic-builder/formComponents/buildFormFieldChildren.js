import escapeHtmlText from '../support/escapeHtmlText.js';
import buildRequiredNoteMarkup from './buildRequiredNoteMarkup.js';

const buildFormFieldChildren = (labelText, controlDefinition, helpText, isRequired) => {
  const childDefinitions = [
    {
      tagName: 'label',
      classes: ['db-field-label'],
      attributes: { 'data-db-field-label': 'true' },
      components: escapeHtmlText(labelText) + (isRequired ? buildRequiredNoteMarkup() : ''),
    },
    controlDefinition,
  ];
  if (helpText)
    childDefinitions.push({
      tagName: 'small',
      classes: ['db-field-help'],
      attributes: { 'data-db-field-help': 'true' },
      components: escapeHtmlText(helpText),
    });
  return childDefinitions;
};

export default buildFormFieldChildren;
