const buildOptionalAttributeGetter =
  (attributeName, unsetValue) =>
  ({ component }) => {
    const attributeRecords = component && component.getAttributes ? component.getAttributes() : {};
    const storedValue = attributeRecords[attributeName];
    const cleanedValue = storedValue === undefined || storedValue === null ? '' : String(storedValue).trim();
    return cleanedValue === '' ? unsetValue : cleanedValue;
  };

export default buildOptionalAttributeGetter;
