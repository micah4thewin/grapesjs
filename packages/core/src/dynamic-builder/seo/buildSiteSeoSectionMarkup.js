import buildSeoSaveRowMarkup from './buildSeoSaveRowMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';
import normalizeRobotsExtraLines from './normalizeRobotsExtraLines.js';

const buildSiteSeoSectionMarkup = (siteSeoRecord) =>
  [
    '<section class="gjs-db-seo-section" id="gjs-db-seo-panel-site" data-db-seo-section="site" role="tabpanel" tabindex="0" aria-labelledby="gjs-db-seo-tab-site">',
    '<div class="gjs-db-section-title">Site defaults</div>',
    buildSeoTextFieldMarkup(
      'siteName',
      'Site name',
      'Appended after page titles and used as the default social site name.',
      siteSeoRecord.siteName,
    ),
    buildSeoTextFieldMarkup(
      'titleTemplate',
      'Title template',
      'Use %s where the page title should appear, for example %s | Acme Studio.',
      siteSeoRecord.titleTemplate,
    ),
    buildSeoTextareaFieldMarkup(
      'defaultDescription',
      'Default description',
      'Used when a page has no description of its own. Aim for 160 characters or fewer.',
      siteSeoRecord.defaultDescription,
    ),
    buildSeoTextFieldMarkup(
      'canonicalBase',
      'Canonical base URL',
      'Absolute site origin such as https://www.example.com. Page URLs, the sitemap and robots.txt build on it.',
      siteSeoRecord.canonicalBase,
    ),
    buildSeoTextFieldMarkup(
      'language',
      'Language code',
      'BCP 47 code such as en or en-US. Exported pages use it for the html lang attribute.',
      siteSeoRecord.language,
    ),
    buildSeoTextFieldMarkup(
      'favicon',
      'Favicon URL',
      'Absolute or site relative URL of the icon browsers show in tabs and bookmarks.',
      siteSeoRecord.favicon,
    ),
    buildSeoTextFieldMarkup(
      'ogSiteName',
      'Open Graph site name',
      'Overrides the site name on shared social cards. Leave empty to reuse the site name.',
      siteSeoRecord.ogSiteName,
    ),
    buildSeoTextFieldMarkup(
      'twitterHandle',
      'Twitter handle',
      'Account credited on shared cards, for example @acme. The @ is added for you when missing.',
      siteSeoRecord.twitterHandle,
    ),
    buildSeoTextareaFieldMarkup(
      'robotsExtra',
      'Extra robots.txt lines',
      'One directive per line, for example Disallow: /drafts. Appended to the generated robots.txt.',
      normalizeRobotsExtraLines(siteSeoRecord.robotsExtra).join('\n'),
    ),
    buildSeoSaveRowMarkup('site', 'Save site defaults'),
    '</section>',
  ].join('');

export default buildSiteSeoSectionMarkup;
