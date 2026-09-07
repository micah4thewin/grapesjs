import buildFormFieldChildren from './buildFormFieldChildren.js';

const buildFieldPresetDefinition = (presetRecord, isRequired) => {
  if (presetRecord.standaloneDefinition) return presetRecord.standaloneDefinition;
  return {
    type: 'db-form-field',
    attributes: {
      'data-db-label': presetRecord.labelText,
      'data-db-help': presetRecord.helpText || '',
      'data-db-required': isRequired ? 'true' : 'false',
      'data-db-field-kind': presetRecord.id,
    },
    components: buildFormFieldChildren(presetRecord.labelText, presetRecord.controlDefinition, presetRecord.helpText),
  };
};

export default buildFieldPresetDefinition;
