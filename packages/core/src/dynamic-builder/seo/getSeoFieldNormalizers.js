import normalizeLanguageCode from './normalizeLanguageCode.js';
import normalizeTwitterHandle from './normalizeTwitterHandle.js';
import toSlugText from '../support/toSlugText.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const getSeoFieldNormalizers = () => ({
  slug: (fieldValue) => toSlugText(fieldValue),
  canonicalBase: (fieldValue) => trimCanonicalBaseUrl(fieldValue),
  twitterHandle: (fieldValue) => normalizeTwitterHandle(fieldValue),
  language: (fieldValue) => normalizeLanguageCode(fieldValue),
});

export default getSeoFieldNormalizers;
