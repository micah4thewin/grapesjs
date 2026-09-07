import writeComponentAttributeValue from '../traits/writeComponentAttributeValue.js';

const buildOptionalAttributeSetter =
  (attributeName, unsetValue) =>
  ({ component, value }) => {
    const nextValue = String(value === undefined || value === null ? '' : value);
    writeComponentAttributeValue(component, attributeName, nextValue === unsetValue ? '' : nextValue);
  };

export default buildOptionalAttributeSetter;
