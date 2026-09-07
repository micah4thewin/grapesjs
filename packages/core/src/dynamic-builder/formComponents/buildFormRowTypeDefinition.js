import buildFieldPresetDefinition from './buildFieldPresetDefinition.js';
import getFieldPresetRecords from './getFieldPresetRecords.js';

const buildRowFieldDefinition = (labelText, fieldName, autocompleteToken) => {
  const textPreset = getFieldPresetRecords().find((presetRecord) => presetRecord.id === 'text');
  const fieldDefinition = buildFieldPresetDefinition(textPreset, false);
  fieldDefinition.attributes['data-db-label'] = labelText;
  fieldDefinition.components[0].components = labelText;
  fieldDefinition.components[1].attributes = { type: 'text', name: fieldName, autocomplete: autocompleteToken };
  return fieldDefinition;
};

const buildFormRowTypeDefinition = () => ({
  type: 'db-form-row',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'form-row') && { type: 'db-form-row' },
  model: {
    defaults: {
      tagName: 'div',
      name: 'Field row',
      draggable: '[data-db-type=form], [data-db-type=form-step]',
      droppable: '[data-db-form-field], [data-db-type=checkbox], [data-db-type=radio-group]',
      classes: ['db-form-row'],
      attributes: { 'data-db-type': 'form-row', 'data-db-form-child': 'true', 'data-db-columns': '2' },
      components: [
        buildRowFieldDefinition('First name', 'first-name', 'given-name'),
        buildRowFieldDefinition('Last name', 'last-name', 'family-name'),
      ],
      traits: [
        {
          type: 'select',
          name: 'data-db-columns',
          label: 'Fields side by side',
          options: [
            { id: '2', label: 'Two' },
            { id: '3', label: 'Three' },
          ],
        },
      ],
    },
  },
});

export default buildFormRowTypeDefinition;
