import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const trimCanonicalBaseUrl = (canonicalBase) =>
  sanitizeUrlValue(String(canonicalBase || ''))
    .trim()
    .replace(/\/+$/, '');

export default trimCanonicalBaseUrl;
