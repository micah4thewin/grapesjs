import resolveAbsoluteSeoUrl from './resolveAbsoluteSeoUrl.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const describeShareImageProblem = (imageValue, canonicalBase) => {
  const trimmedValue = String(imageValue || '').trim();
  if (!trimmedValue) return '';
  if (/^data:/i.test(trimmedValue)) {
    return 'Uploaded images are embedded in the page, so social networks cannot load them. Use an image with a web address.';
  }
  if (!sanitizeUrlValue(trimmedValue)) return 'This does not look like a safe image address.';
  if (resolveAbsoluteSeoUrl(trimmedValue, canonicalBase)) return '';
  if (!trimCanonicalBaseUrl(canonicalBase)) {
    return 'Relative image paths need the site address under Site defaults to become full addresses.';
  }
  return 'Use a full image address starting with https://.';
};

export default describeShareImageProblem;
