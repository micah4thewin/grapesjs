const buildOptionDefinition = (optionValue, optionLabel, extraAttributes) => ({
  tagName: 'option',
  attributes: { value: optionValue, ...(extraAttributes || {}) },
  components: [{ type: 'textnode', content: String(optionLabel || '') }],
  draggable: false,
  droppable: false,
  selectable: false,
  hoverable: false,
  layerable: false,
  copyable: false,
  removable: false,
  editable: false,
  traits: [],
});

export default buildOptionDefinition;
