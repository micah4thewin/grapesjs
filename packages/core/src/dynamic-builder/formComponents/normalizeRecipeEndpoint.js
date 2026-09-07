import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const normalizeRecipeEndpoint = (recipeRecord, rawValue) => {
  const trimmedValue = String(rawValue || '').trim();
  if (!trimmedValue) return { endpointUrl: '', isValid: true };
  const looksLikeId = /^[A-Za-z0-9_-]{4,40}$/.test(trimmedValue);
  if (looksLikeId && recipeRecord && recipeRecord.endpointPrefix)
    return { endpointUrl: recipeRecord.endpointPrefix + trimmedValue, isValid: true };
  const safeValue = sanitizeUrlValue(trimmedValue);
  if (!safeValue || !/^https:\/\//i.test(safeValue)) return { endpointUrl: '', isValid: false };
  const matchesHost = !recipeRecord || !recipeRecord.urlHost || safeValue.indexOf(recipeRecord.urlHost) >= 0;
  return { endpointUrl: safeValue, isValid: matchesHost };
};

export default normalizeRecipeEndpoint;
