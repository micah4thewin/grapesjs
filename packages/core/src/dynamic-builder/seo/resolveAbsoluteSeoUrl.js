import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const resolveAbsoluteSeoUrl = (candidateValue, canonicalBase) => {
  const safeValue = sanitizeUrlValue(candidateValue).trim();
  if (!safeValue) return '';
  const trimmedBase = trimCanonicalBaseUrl(canonicalBase);
  try {
    const parsedUrl = trimmedBase ? new URL(safeValue, trimmedBase + '/') : new URL(safeValue);
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') return '';
    return parsedUrl.href;
  } catch (parseError) {
    return '';
  }
};

export default resolveAbsoluteSeoUrl;
