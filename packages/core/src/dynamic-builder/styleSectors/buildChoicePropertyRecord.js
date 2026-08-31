const buildChoicePropertyRecord = (choiceType, propertyName, labelText, defaultValue, optionList, extraRecord) => ({
  type: choiceType,
  property: propertyName,
  name: labelText,
  default: defaultValue,
  options: optionList.map((option) => (typeof option === 'string' ? { id: option } : option)),
  ...(extraRecord || {}),
});

export default buildChoicePropertyRecord;
