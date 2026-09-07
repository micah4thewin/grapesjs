import escapeHtmlText from '../support/escapeHtmlText.js';

const buildRadioChoiceDefinition = (optionEntry, groupName, selectedValue, isRequired) => {
  const inputAttributes = { type: 'radio', name: groupName, value: optionEntry.optionValue };
  if (optionEntry.optionValue === selectedValue) inputAttributes.checked = 'checked';
  if (isRequired) inputAttributes.required = 'required';
  return {
    tagName: 'label',
    classes: ['db-choice'],
    attributes: { 'data-db-radio-choice': 'true' },
    draggable: false,
    droppable: false,
    copyable: false,
    removable: false,
    traits: [],
    components: [
      {
        tagName: 'input',
        attributes: inputAttributes,
        selectable: false,
        hoverable: false,
        layerable: false,
        draggable: false,
        removable: false,
        copyable: false,
        traits: [],
      },
      {
        tagName: 'span',
        classes: ['db-choice-text'],
        attributes: { 'data-db-radio-choice-text': 'true' },
        selectable: false,
        hoverable: false,
        layerable: false,
        draggable: false,
        removable: false,
        copyable: false,
        traits: [],
        components: escapeHtmlText(optionEntry.optionLabel),
      },
    ],
  };
};

export default buildRadioChoiceDefinition;
