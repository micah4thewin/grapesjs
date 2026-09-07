import resolveAbsoluteSeoUrl from './resolveAbsoluteSeoUrl.js';
import toSlugText from '../support/toSlugText.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';
import validateShareImageField from './validateShareImageField.js';

const blockWith = (messageText) => ({ message: messageText, isBlocking: true });

const getPageSeoFieldValidators = () => ({
  slug: (rawValue) =>
    rawValue.trim() && !toSlugText(rawValue)
      ? blockWith('Use letters, numbers and hyphens, for example about-us.')
      : '',
  canonical: (rawValue, siteValues) => {
    if (!rawValue.trim() || resolveAbsoluteSeoUrl(rawValue, siteValues.canonicalBase)) return '';
    return blockWith(
      trimCanonicalBaseUrl(siteValues.canonicalBase)
        ? 'Enter a full address starting with https://, or a path such as /about.'
        : 'Enter a full address starting with https://, or set the site address under Site defaults first.',
    );
  },
  ogImage: validateShareImageField,
  twitterImage: validateShareImageField,
});

export default getPageSeoFieldValidators;
