import isValidLanguageCode from './isValidLanguageCode.js';
import listInvalidRobotsLines from './listInvalidRobotsLines.js';
import normalizeTwitterHandle from './normalizeTwitterHandle.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';
import validateShareImageField from './validateShareImageField.js';

const blockWith = (messageText) => ({ message: messageText, isBlocking: true });

const getSiteSeoFieldValidators = () => ({
  titleTemplate: (rawValue) =>
    rawValue.trim() && !rawValue.includes('%s')
      ? blockWith('Add %s where the page title should go, for example %s | Acme Studio.')
      : '',
  canonicalBase: (rawValue) =>
    rawValue.trim() && !trimCanonicalBaseUrl(rawValue)
      ? blockWith('Enter the full site address starting with https://, for example https://www.example.com.')
      : '',
  language: (rawValue) =>
    rawValue.trim() && !isValidLanguageCode(rawValue) ? blockWith('Choose a language from the list.') : '',
  twitterHandle: (rawValue) =>
    rawValue.trim() && !normalizeTwitterHandle(rawValue)
      ? blockWith('Handles are 1 to 15 letters, numbers or underscores, for example @acme.')
      : '',
  robotsExtra: (rawValue) => {
    const invalidLines = listInvalidRobotsLines(rawValue);
    if (!invalidLines.length) return '';
    return blockWith(
      'Each line must start with User-agent, Allow, Disallow, Crawl-delay or Sitemap. Check "' + invalidLines[0] + '".',
    );
  },
  favicon: (rawValue) =>
    rawValue.trim() && !sanitizeUrlValue(rawValue) ? blockWith('This does not look like a safe image address.') : '',
  defaultOgImage: validateShareImageField,
});

export default getSiteSeoFieldValidators;
