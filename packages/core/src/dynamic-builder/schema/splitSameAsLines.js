import normalizeSchemaUrlValue from './normalizeSchemaUrlValue.js';

const splitSameAsLines = (sameAsText) =>
  String(sameAsText || '')
    .split('\n')
    .map((lineText) => normalizeSchemaUrlValue(lineText.trim()))
    .filter(Boolean);

export default splitSameAsLines;
