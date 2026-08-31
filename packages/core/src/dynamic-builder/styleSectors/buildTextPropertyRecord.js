const buildTextPropertyRecord = (propertyName, labelText, defaultValue, extraRecord) => ({
  property: propertyName,
  name: labelText,
  default: defaultValue,
  ...(extraRecord || {}),
});

export default buildTextPropertyRecord;
