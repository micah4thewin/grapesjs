import isValidLanguageCode from './isValidLanguageCode.js';
import resolveSeoDescriptionText from './resolveSeoDescriptionText.js';
import resolveSeoTitleText from './resolveSeoTitleText.js';
import resolveShareImageUrls from './resolveShareImageUrls.js';
import toSlugText from '../support/toSlugText.js';
import trimCanonicalBaseUrl from './trimCanonicalBaseUrl.js';

const listSeoHealthChecks = () => [
  {
    checkId: 'title',
    weight: 20,
    run: ({ siteSeo, pageSeo, pageName }) =>
      String(pageSeo.title || '').trim()
        ? ''
        : 'No custom page title; search results will show "' + resolveSeoTitleText(siteSeo, pageSeo, pageName) + '".',
  },
  {
    checkId: 'description',
    weight: 20,
    run: ({ siteSeo, pageSeo }) => {
      const descriptionLength = resolveSeoDescriptionText(siteSeo, pageSeo).length;
      if (!descriptionLength) return 'No meta description.';
      if (descriptionLength < 50) return 'The meta description is short (' + descriptionLength + ' characters).';
      return descriptionLength > 160 ? 'The meta description is long (' + descriptionLength + ' characters).' : '';
    },
  },
  {
    checkId: 'siteName',
    weight: 10,
    run: ({ siteSeo }) => (String(siteSeo.siteName || '').trim() ? '' : 'No site name.'),
  },
  {
    checkId: 'canonicalBase',
    weight: 15,
    run: ({ siteSeo }) => (trimCanonicalBaseUrl(siteSeo.canonicalBase) ? '' : 'No site address (canonical base URL).'),
  },
  {
    checkId: 'shareImage',
    weight: 15,
    run: ({ siteSeo, pageSeo }) => (resolveShareImageUrls(siteSeo, pageSeo).ogImageUrl ? '' : 'No usable share image.'),
  },
  {
    checkId: 'language',
    weight: 10,
    run: ({ siteSeo }) => (isValidLanguageCode(siteSeo.language) ? '' : 'No site language chosen.'),
  },
  {
    checkId: 'slug',
    weight: 5,
    run: ({ pageSeo, isMainPage }) => {
      const slugValue = String(pageSeo.slug || '').trim();
      if (isMainPage || !slugValue || toSlugText(slugValue) === slugValue) return '';
      return 'The slug "' + slugValue + '" is not URL friendly.';
    },
  },
  {
    checkId: 'favicon',
    weight: 5,
    run: ({ siteSeo }) => (String(siteSeo.favicon || '').trim() ? '' : 'No favicon; a placeholder icon is exported.'),
  },
];

export default listSeoHealthChecks;
