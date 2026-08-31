import buildSiteSettingsFieldMarkup from './buildSiteSettingsFieldMarkup.js';

const buildSiteSettingsFormMarkup = (siteSeoRecord) =>
  [
    '<div class="gjs-db-form" data-db-site-settings>',
    '<div class="gjs-db-section-title">Site basics</div>',
    '<div class="gjs-db-muted">Shortcuts to the site SEO defaults. Saving writes the same keys.</div>',
    buildSiteSettingsFieldMarkup(
      'siteName',
      'Site name',
      'Shown after page titles and reused on social cards.',
      siteSeoRecord.siteName,
    ),
    buildSiteSettingsFieldMarkup(
      'canonicalBase',
      'Canonical base URL',
      'Absolute site origin such as https://www.example.com used for page URLs and the sitemap.',
      siteSeoRecord.canonicalBase,
    ),
    buildSiteSettingsFieldMarkup(
      'language',
      'Language code',
      'BCP 47 code such as en or en-US used for the html lang attribute of exported pages.',
      siteSeoRecord.language,
    ),
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-site-save>Save settings</button>',
    '</div>',
    '</div>',
  ].join('');

export default buildSiteSettingsFormMarkup;
