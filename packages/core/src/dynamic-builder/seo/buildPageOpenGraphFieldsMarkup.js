import buildSeoSelectFieldMarkup from './buildSeoSelectFieldMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';

const buildPageOpenGraphFieldsMarkup = (pageSeoRecord) =>
  [
    '<div class="gjs-db-section-title">Social sharing (Open Graph)</div>',
    buildSeoTextFieldMarkup(
      'ogTitle',
      'Share title',
      'Title used by Facebook, LinkedIn and chat apps. Leave empty to reuse the page title.',
      pageSeoRecord.ogTitle,
    ),
    buildSeoTextareaFieldMarkup(
      'ogDescription',
      'Share description',
      'Description shown on shared social cards. Leave empty to reuse the meta description.',
      pageSeoRecord.ogDescription,
    ),
    buildSeoTextFieldMarkup(
      'ogImage',
      'Share image URL',
      'Absolute URL of the preview image. Recommended size 1200 by 630 pixels.',
      pageSeoRecord.ogImage,
    ),
    buildSeoSelectFieldMarkup(
      'ogType',
      'Open Graph type',
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
