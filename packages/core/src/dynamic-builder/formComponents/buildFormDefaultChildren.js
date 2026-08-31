import buildFormFieldChildren from './buildFormFieldChildren.js';

const buildFormDefaultChildren = (formTextDefaults) => {
  const buildFieldDefinition = (labelText, controlDefinition, helpText, isRequired) => ({
    type: 'db-form-field',
    attributes: {
      'data-db-type': 'form-field',
      'data-db-form-child': 'true',
      'data-db-form-field': 'true',
      'data-db-label': labelText,
      'data-db-required': isRequired ? 'true' : 'false',
    },
    components: buildFormFieldChildren(labelText, controlDefinition, helpText, isRequired),
  });
  const buildControlDefinition = (componentType, controlAttributes) => ({
    type: componentType,
    attributes: controlAttributes,
  });
  return [
    buildFieldDefinition(
      formTextDefaults.nameFieldLabelText,
      buildControlDefinition('db-input', {
        'data-db-type': 'input',
        'data-db-form-control': 'true',
        type: 'text',
        name: 'name',
        autocomplete: 'name',
        required: 'required',
      }),
      '',
      true,
    ),
    buildFieldDefinition(
      formTextDefaults.emailFieldLabelText,
      buildControlDefinition('db-input', {
        'data-db-type': 'input',
        'data-db-form-control': 'true',
        type: 'email',
        name: 'email',
        autocomplete: 'email',
        required: 'required',
      }),
      '',
      true,
    ),
    buildFieldDefinition(
      formTextDefaults.messageFieldLabelText,
      buildControlDefinition('db-textarea', {
        'data-db-type': 'textarea',
        'data-db-form-control': 'true',
        name: 'message',
        rows: '5',
        placeholder: formTextDefaults.textareaPlaceholderText,
      }),
      formTextDefaults.messageFieldHelpText,
      false,
    ),
    { type: 'db-consent-checkbox' },
    { type: 'db-honeypot' },
    { type: 'db-submit-button' },
    {
      tagName: 'div',
      classes: ['db-form-status'],
      attributes: {
        role: 'status',
        'aria-live': 'polite',
        'data-db-form-status': 'true',
        'data-db-form-child': 'true',
      },
    },
  ];
};

export default buildFormDefaultChildren;
