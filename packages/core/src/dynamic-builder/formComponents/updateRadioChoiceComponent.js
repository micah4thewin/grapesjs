import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import findFieldControlComponent from './findFieldControlComponent.js';
import syncTextComponentContent from './syncTextComponentContent.js';

const toggleBooleanAttribute = (targetComponent, attributeName, isEnabled) => {
  if (isEnabled) targetComponent.addAttributes({ [attributeName]: attributeName });
  else targetComponent.removeAttributes([attributeName]);
};

const updateRadioChoiceComponent = (choiceComponent, optionEntry, groupName, selectedValue, isRequired) => {
  const inputComponent = findFieldControlComponent(choiceComponent);
  if (inputComponent) {
    inputComponent.addAttributes({ name: groupName, value: optionEntry.optionValue });
    toggleBooleanAttribute(inputComponent, 'checked', optionEntry.optionValue === selectedValue);
    toggleBooleanAttribute(inputComponent, 'required', Boolean(isRequired));
  }
  const textComponent = findDescendantByAttributeName(choiceComponent, 'data-db-radio-choice-text');
  syncTextComponentContent(textComponent || choiceComponent.find('.db-choice-text')[0], optionEntry.optionLabel);
};

export default updateRadioChoiceComponent;
