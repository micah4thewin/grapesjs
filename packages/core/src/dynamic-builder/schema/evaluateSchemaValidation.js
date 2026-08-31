import isPlainRecord from '../support/isPlainRecord.js';

const evaluateSchemaValidation = (candidateValues, validationRules) => {
  const valuesRecord = isPlainRecord(candidateValues) ? candidateValues : {};
  const isMissingProperty = (propertyName) => !String(valuesRecord[propertyName] || '').trim();
  return {
    missingRequired: (validationRules.required || []).filter(isMissingProperty),
    missingRecommended: (validationRules.recommended || []).filter(isMissingProperty),
  };
};

export default evaluateSchemaValidation;
