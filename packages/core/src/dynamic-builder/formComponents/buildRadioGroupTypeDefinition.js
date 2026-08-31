import buildRadioGroupChildrenMarkup from './buildRadioGroupChildrenMarkup.js';

const buildRadioGroupTypeDefinition = (formTextDefaults) => ({
  type: 'db-radio-group',
  isComponent: (el) => Boolean(el && el.dataset && el.dataset.dbType === 'radio-group') && { type: 'db-radio-group' },
  model: {
    defaults: {
      tagName: 'fieldset',
      name: 'Radio group',
      draggable: '[data-db-type=form]',
      droppable: false,
      classes: ['db-radio-group'],
      attributes: {
        'data-db-type': 'radio-group',
        'data-db-form-child': 'true',
        'data-db-legend': formTextDefaults.radioLegendText,
        'data-db-group-name': 'contact-method',
        'data-db-options': formTextDefaults.radioOptionsText,
      },
      components: buildRadioGroupChildrenMarkup(
        formTextDefaults.radioLegendText,
        'contact-method',
        formTextDefaults.radioOptionsText,
      ),
      traits: [
        { type: 'text', name: 'data-db-legend', label: 'Legend' },
        { type: 'text', name: 'data-db-group-name', label: 'Group name' },
        {
          type: 'db-textarea-trait',
          name: 'data-db-options',
          label: 'Options',
          placeholder: 'value|Label, one per line',
        },
      ],
    },
  },
});

export default buildRadioGroupTypeDefinition;
