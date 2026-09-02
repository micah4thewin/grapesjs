import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const trimCanonicalBaseUrl = (canonicalBase) => {
  const safeValue = sanitizeUrlValue(String(canonicalBase || '')).trim();
  if (!safeValue) return '';
  try {
    const parsedUrl = new URL(safeValue);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') return '';
    const pathText = parsedUrl.pathname.replace(/\/+$/, '');
    return parsedUrl.origin + pathText;
  } catch (parseError) {
    return '';
  }
};

export default trimCanonicalBaseUrl;
