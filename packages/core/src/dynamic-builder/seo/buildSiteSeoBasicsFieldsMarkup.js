import buildSeoLanguageOptionEntries from './buildSeoLanguageOptionEntries.js';
import buildSeoSelectFieldMarkup from './buildSeoSelectFieldMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';
import normalizeLanguageCode from './normalizeLanguageCode.js';

const buildSiteSeoBasicsFieldsMarkup = (siteSeoRecord) =>
  [
    buildSeoTextFieldMarkup(
      'siteName',
      'Site name',
      'Shown after page titles in browser tabs and search results, and as the site name on shared links.',
      siteSeoRecord.siteName,
    ),
    buildSeoTextFieldMarkup(
      'titleTemplate',
      'Title template',
      'How page titles are assembled. Write %s where the page title goes, for example %s | Acme Studio. Leave empty for "Page title | Site name".',
      siteSeoRecord.titleTemplate,
    ),
    buildSeoTextareaFieldMarkup(
      'defaultDescription',
      'Default description',
      'Used for pages without a description of their own. Aim for 50 to 160 characters.',
      siteSeoRecord.defaultDescription,
    ),
    buildSeoTextFieldMarkup(
      'canonicalBase',
      'Site address (canonical base URL)',
      'The address the site is published at, such as https://www.example.com. Page links, the sitemap and share images build on it.',
      siteSeoRecord.canonicalBase,
      '',
      { placeholder: 'https://www.example.com' },
    ),
    buildSeoSelectFieldMarkup(
      'language',
      'Site language',
      'Tells browsers, search engines and screen readers which language the site is written in. English is used until you choose one.',
      normalizeLanguageCode(siteSeoRecord.language),
      buildSeoLanguageOptionEntries(siteSeoRecord.language),
    ),
  ].join('');

export default buildSiteSeoBasicsFieldsMarkup;
