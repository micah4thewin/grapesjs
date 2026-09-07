const buildFieldLabelTypeDefinition = () => ({
  type: 'db-field-label',
  extend: 'text',
  isComponent: (el) =>
    Boolean(el && el.dataset && (el.dataset.dbFieldLabel || el.dataset.dbRadioLegend || el.dataset.dbChoiceText)) && {
      type: 'db-field-label',
    },
  model: {
    defaults: {
      tagName: 'label',
      name: 'Label',
      draggable: false,
      droppable: false,
      copyable: false,
      removable: false,
      traits: [],
    },
  },
});

export default buildFieldLabelTypeDefinition;
