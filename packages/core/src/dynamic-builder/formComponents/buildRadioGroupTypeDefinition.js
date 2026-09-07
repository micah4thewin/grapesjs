import buildRadioGroupChildrenDefinitions from './buildRadioGroupChildrenDefinitions.js';
import buildShowWhenTraitDefinitions from './buildShowWhenTraitDefinitions.js';
import getFormChildDropTargets from './getFormChildDropTargets.js';

const buildRadioGroupTypeDefinition = (formTextDefaults) => ({
  type: 'db-radio-group',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'radio-group') && { type: 'db-radio-group' },
  model: {
    defaults: {
      tagName: 'fieldset',
      name: 'Choice list',
      draggable: getFormChildDropTargets(),
      droppable: false,
      classes: ['db-radio-group'],
      attributes: {
        'data-db-type': 'radio-group',
        'data-db-form-child': 'true',
        'data-db-legend': formTextDefaults.radioLegendText,
        'data-db-group-name': 'contact-method',
        'data-db-options': formTextDefaults.radioOptionsText,
        'data-db-selected': '',
        'data-db-required': 'false',
      },
      components: buildRadioGroupChildrenDefinitions(
        formTextDefaults.radioLegendText,
        'contact-method',
        formTextDefaults.radioOptionsText,
        '',
        false,
      ),
      traits: [
        { type: 'text', name: 'data-db-legend', label: 'Question' },
        { type: 'db-option-list', name: 'data-db-options', label: 'Choices' },
        {
          type: 'checkbox',
          name: 'data-db-required',
          label: 'Required',
          valueTrue: 'true',
          valueFalse: 'false',
        },
        { type: 'text', name: 'data-db-group-name', label: 'Field name', placeholder: 'contact-method' },
        ...buildShowWhenTraitDefinitions(),
      ],
    },
  },
});

export default buildRadioGroupTypeDefinition;
