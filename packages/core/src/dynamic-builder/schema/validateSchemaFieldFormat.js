import normalizeSchemaPriceValue from './normalizeSchemaPriceValue.js';
import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';

const isValidDateText = (dateText) =>
  /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?)?$/.test(dateText) && !Number.isNaN(new Date(dateText).getTime());

const validateSchemaFieldFormat = (formatName, fieldValue) => {
  const textValue = String(fieldValue == null ? '' : fieldValue).trim();
  if (!textValue) return true;
  if (formatName === 'url') return normalizeSchemaUrlValue(textValue) !== '';
  if (formatName === 'urlLines')
    return textValue
      .split('\n')
      .every((lineText) => normalizeSchemaUrlValue(lineText.trim()) !== '' || !lineText.trim());
  if (formatName === 'number') return normalizeSchemaPriceValue(textValue) !== '';
  if (formatName === 'date') return isValidDateText(textValue);
  if (formatName === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(textValue);
  if (formatName === 'tel') return /^\+?[\d\s().-]{5,}$/.test(textValue);
  return true;
};

export default validateSchemaFieldFormat;
