import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const splitSameAsLines = (sameAsText) =>
  String(sameAsText || '')
    .split('\n')
    .map((lineText) => sanitizeUrlValue(lineText.trim()))
    .filter(Boolean);

export default splitSameAsLines;
