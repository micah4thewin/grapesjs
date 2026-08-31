import escapeHtmlText from '../support/escapeHtmlText.js';

const buildFormFieldContentRecord = (labelText, controlRecord, fieldOptions = {}) => {
  const isRequired = Boolean(fieldOptions.required);
  const requiredNoteMarkup = '<span class="db-visually-hidden" data-db-required-note="true">(required)</span>';
  const childRecords = [
    {
      tagName: 'label',
      classes: ['db-field-label'],
      attributes: { 'data-db-field-label': 'true' },
      components: escapeHtmlText(labelText) + (isRequired ? requiredNoteMarkup : ''),
    },
    controlRecord,
  ];
  if (fieldOptions.helpText)
    childRecords.push({
      tagName: 'small',
      classes: ['db-field-help'],
      attributes: { 'data-db-field-help': 'true' },
      components: escapeHtmlText(fieldOptions.helpText),
    });
  const fieldAttributes = {
    'data-db-label': labelText,
    'data-db-required': isRequired ? 'true' : 'false',
  };
  if (fieldOptions.helpText) fieldAttributes['data-db-help'] = fieldOptions.helpText;
  return { type: 'db-form-field', attributes: fieldAttributes, components: childRecords };
};

export default buildFormFieldContentRecord;
