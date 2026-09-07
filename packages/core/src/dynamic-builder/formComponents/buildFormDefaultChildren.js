import buildFormFieldChildren from './buildFormFieldChildren.js';

const buildFormDefaultChildren = (formTextDefaults) => {
  const buildFieldDefinition = (fieldKind, labelText, controlDefinition, helpText, isRequired) => ({
    type: 'db-form-field',
    attributes: {
      'data-db-type': 'form-field',
      'data-db-form-child': 'true',
      'data-db-form-field': 'true',
      'data-db-label': labelText,
      'data-db-help': helpText,
      'data-db-required': isRequired ? 'true' : 'false',
      'data-db-field-kind': fieldKind,
    },
    components: buildFormFieldChildren(labelText, controlDefinition, helpText),
  });
  return [
    buildFieldDefinition(
      'text',
      formTextDefaults.nameFieldLabelText,
      {
        type: 'db-input',
        attributes: {
          type: 'text',
          name: 'name',
          autocomplete: 'name',
          placeholder: 'Jane Smith',
          required: 'required',
        },
      },
      '',
      true,
    ),
    buildFieldDefinition(
      'email',
      formTextDefaults.emailFieldLabelText,
      {
        type: 'db-input',
        attributes: {
          type: 'email',
          name: 'email',
          autocomplete: 'email',
          inputmode: 'email',
          placeholder: 'you@example.com',
          required: 'required',
        },
      },
      '',
      true,
    ),
    buildFieldDefinition(
      'textarea',
      formTextDefaults.messageFieldLabelText,
      {
        type: 'db-textarea',
        attributes: { name: 'message', rows: '5', placeholder: formTextDefaults.textareaPlaceholderText },
      },
      formTextDefaults.messageFieldHelpText,
      false,
    ),
    { type: 'db-consent-checkbox' },
    { type: 'db-honeypot' },
    { type: 'db-submit-button' },
    { type: 'db-form-status' },
  ];
};

export default buildFormDefaultChildren;
