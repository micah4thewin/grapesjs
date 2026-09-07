import isPlainRecord from '../support/isPlainRecord.js';
import validateSchemaFieldFormat from './validateSchemaFieldFormat.js';

const evaluateSchemaValidation = (candidateValues, validationRules) => {
  const valuesRecord = isPlainRecord(candidateValues) ? candidateValues : {};
  const rulesRecord = isPlainRecord(validationRules) ? validationRules : {};
  const formatRecord = isPlainRecord(rulesRecord.formats) ? rulesRecord.formats : {};
  const isMissingProperty = (propertyName) => !String(valuesRecord[propertyName] || '').trim();
  return {
    missingRequired: (rulesRecord.required || []).filter(isMissingProperty),
    missingRecommended: (rulesRecord.recommended || []).filter(isMissingProperty),
    invalid: Object.keys(formatRecord).filter(
      (propertyName) => !validateSchemaFieldFormat(formatRecord[propertyName], valuesRecord[propertyName]),
    ),
  };
};

export default evaluateSchemaValidation;
