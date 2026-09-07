import buildSeoImageFieldMarkup from './buildSeoImageFieldMarkup.js';
import buildSeoSelectFieldMarkup from './buildSeoSelectFieldMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';

const buildPageOpenGraphFieldsMarkup = (pageSeoRecord) =>
  [
    '<div class="gjs-db-section-title">Social sharing (Open Graph)</div>',
    buildSeoTextFieldMarkup(
      'ogTitle',
      'Share title',
      'Shown when the page is shared on Facebook, LinkedIn and chat apps. Leave empty to reuse the page title.',
      pageSeoRecord.ogTitle,
    ),
    buildSeoTextareaFieldMarkup(
      'ogDescription',
      'Share description',
      'Shown on shared cards. Leave empty to reuse the meta description.',
      pageSeoRecord.ogDescription,
    ),
    buildSeoImageFieldMarkup(
      'ogImage',
      'Share image',
      'Hosted image of 1200 by 630 pixels. Relative paths become full addresses using the site address. Leave empty to use the default share image.',
      pageSeoRecord.ogImage,
    ),
    buildSeoSelectFieldMarkup(
      'ogType',
      'Content type',
      'What kind of content this page represents to social platforms.',
      pageSeoRecord.ogType || 'website',
      [
        ['website', 'Website'],
        ['article', 'Article'],
        ['product', 'Product'],
        ['profile', 'Profile'],
      ],
    ),
  ].join('');

export default buildPageOpenGraphFieldsMarkup;
