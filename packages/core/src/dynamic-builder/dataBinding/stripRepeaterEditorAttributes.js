import getRepeaterAttributeNames from './getRepeaterAttributeNames.js';

const stripRepeaterEditorAttributes = (repeaterElement) => {
  if (!repeaterElement || !repeaterElement.removeAttribute) return;
  const attributeNames = getRepeaterAttributeNames();
  Object.keys(attributeNames)
    .filter((settingKey) => settingKey !== 'sourceName')
    .forEach((settingKey) => repeaterElement.removeAttribute(attributeNames[settingKey]));
  repeaterElement.removeAttribute('data-db-repeater');
};

export default stripRepeaterEditorAttributes;
