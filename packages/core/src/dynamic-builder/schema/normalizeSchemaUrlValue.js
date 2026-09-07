import resolveAbsoluteSeoUrl from '../seo/resolveAbsoluteSeoUrl.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const domainPattern = /^[a-z0-9-]+(\.[a-z0-9-]+)+(:\d+)?(\/.*)?$/i;
const searchPlaceholder = '{search_term_string}';
const placeholderMarker = 'SEARCHTERMPLACEHOLDER';

const normalizeSchemaUrlValue = (candidateValue, canonicalBase) => {
  const safeValue = sanitizeUrlValue(candidateValue);
  if (!safeValue) return '';
  if (safeValue.includes(searchPlaceholder)) {
    const normalizedTemplate = normalizeSchemaUrlValue(
      safeValue.split(searchPlaceholder).join(placeholderMarker),
      canonicalBase,
    );
    return normalizedTemplate.split(placeholderMarker).join(searchPlaceholder);
  }
  if (/^https?:\/\//i.test(safeValue)) return resolveAbsoluteSeoUrl(safeValue, '');
  if (safeValue.startsWith('/')) return canonicalBase ? resolveAbsoluteSeoUrl(safeValue, canonicalBase) : '';
  if (domainPattern.test(safeValue)) return resolveAbsoluteSeoUrl('https://' + safeValue, '');
  return '';
};

export default normalizeSchemaUrlValue;
