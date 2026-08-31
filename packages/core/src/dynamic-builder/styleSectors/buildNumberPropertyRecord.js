import getSizeUnitList from './getSizeUnitList.js';

const buildNumberPropertyRecord = (propertyName, labelText, defaultValue, extraRecord) => ({
  type: 'number',
  property: propertyName,
  name: labelText,
  default: defaultValue,
  units: getSizeUnitList(),
  ...(extraRecord || {}),
});

export default buildNumberPropertyRecord;
