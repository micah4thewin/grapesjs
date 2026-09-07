import buildRadioChoiceDefinition from './buildRadioChoiceDefinition.js';
import buildRadioGroupChildrenDefinitions from './buildRadioGroupChildrenDefinitions.js';
import findDescendantByAttributeName from './findDescendantByAttributeName.js';
import findFieldControlComponent from './findFieldControlComponent.js';
import resolveOptionEntries from './resolveOptionEntries.js';
import sanitizeFieldName from './sanitizeFieldName.js';
import syncLegendFromAttribute from './syncLegendFromAttribute.js';
import updateRadioChoiceComponent from './updateRadioChoiceComponent.js';

const readChoiceValue = (choiceComponent) => {
  const inputComponent = findFieldControlComponent(choiceComponent);
  return inputComponent ? String(inputComponent.getAttributes().value || '') : '';
};

const syncRadioGroupFromAttributes = (component) => {
  if (!component || !component.is || !component.is('db-radio-group')) return;
  const componentAttributes = component.getAttributes();
  const groupName = sanitizeFieldName(componentAttributes['data-db-group-name'], 'choice');
  if (groupName !== componentAttributes['data-db-group-name']) {
    component.addAttributes({ 'data-db-group-name': groupName });
    return;
  }
  const optionEntries = resolveOptionEntries(componentAttributes['data-db-options']);
  const selectedValue = String(componentAttributes['data-db-selected'] || '');
  const isRequired = componentAttributes['data-db-required'] === 'true';
  const listComponent = findDescendantByAttributeName(component, 'data-db-radio-options');
  if (!listComponent || !findDescendantByAttributeName(component, 'data-db-radio-legend')) {
    component.components(
      buildRadioGroupChildrenDefinitions(
        componentAttributes['data-db-legend'],
        groupName,
        componentAttributes['data-db-options'],
        selectedValue,
        isRequired,
      ),
    );
    return;
  }
  syncLegendFromAttribute(component, 'Choose an option');
  const existingChoices = listComponent.components().models.slice();
  const keptChoices = [];
  optionEntries.forEach((optionEntry, optionIndex) => {
    let choiceComponent = existingChoices.find(
      (candidate) => keptChoices.indexOf(candidate) < 0 && readChoiceValue(candidate) === optionEntry.optionValue,
    );
    if (!choiceComponent) {
      const appended = listComponent.append(
        buildRadioChoiceDefinition(optionEntry, groupName, selectedValue, isRequired),
        { at: optionIndex },
      );
      choiceComponent = appended[0];
    } else if (listComponent.components().indexOf(choiceComponent) !== optionIndex) {
      listComponent.append(choiceComponent, { at: optionIndex });
    }
    keptChoices.push(choiceComponent);
    updateRadioChoiceComponent(choiceComponent, optionEntry, groupName, selectedValue, isRequired);
  });
  existingChoices.forEach((choiceComponent) => keptChoices.indexOf(choiceComponent) < 0 && choiceComponent.remove());
};

export default syncRadioGroupFromAttributes;
