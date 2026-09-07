import buildSiteSettingsFieldMarkup from './buildSiteSettingsFieldMarkup.js';

const commonLanguageCodes = [
  'en',
  'en-US',
  'en-GB',
  'de',
  'fr',
  'es',
  'it',
  'nl',
  'pt',
  'pt-BR',
  'pl',
  'sv',
  'da',
  'ja',
  'zh-CN',
];

const buildSiteSettingsFormMarkup = (siteSeoRecord) =>
  [
    '<div class="gjs-db-form" data-db-site-settings>',
    '<div class="gjs-db-section-title">Site basics</div>',
    '<div class="gjs-db-muted">These basics are shared with the SEO settings.</div>',
    buildSiteSettingsFieldMarkup(
      'siteName',
      'Site name',
      'Shown after page titles and reused on social cards.',
      siteSeoRecord.siteName,
      { placeholder: 'For example: Acme Bakery' },
    ),
    buildSiteSettingsFieldMarkup(
      'canonicalBase',
      'Site address',
      'The full web address where the site will live. Used for page links and the sitemap.',
      siteSeoRecord.canonicalBase,
      { inputType: 'url', placeholder: 'https://www.example.com' },
    ),
    buildSiteSettingsFieldMarkup(
      'language',
      'Language',
      'The main language of the site as a short code, so browsers and screen readers read it correctly.',
      siteSeoRecord.language,
      { listId: 'gjs-db-site-language-list', listValues: commonLanguageCodes, placeholder: 'en' },
    ),
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-site-save>Save settings</button>',
    '</div>',
    '</div>',
  ].join('');

export default buildSiteSettingsFormMarkup;
