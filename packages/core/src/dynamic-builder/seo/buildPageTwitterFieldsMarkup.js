import buildSeoSelectFieldMarkup from './buildSeoSelectFieldMarkup.js';
import buildSeoTextFieldMarkup from './buildSeoTextFieldMarkup.js';
import buildSeoTextareaFieldMarkup from './buildSeoTextareaFieldMarkup.js';

const buildPageTwitterFieldsMarkup = (pageSeoRecord) =>
  [
    '<div class="gjs-db-section-title">Twitter card</div>',
    buildSeoSelectFieldMarkup(
      'twitterCard',
      'Card style',
      'Automatic picks the large card when a share image is set, the compact one otherwise.',
      pageSeoRecord.twitterCard || '',
      [
        ['', 'Automatic'],
        ['summary', 'Summary'],
        ['summary_large_image', 'Summary with large image'],
      ],
    ),
    buildSeoTextFieldMarkup(
      'twitterTitle',
      'Card title',
      'Leave empty to reuse the share title, then the page title.',
      pageSeoRecord.twitterTitle,
    ),
    buildSeoTextareaFieldMarkup(
      'twitterDescription',
      'Card description',
      'Leave empty to reuse the share description, then the meta description.',
      pageSeoRecord.twitterDescription,
    ),
    buildSeoTextFieldMarkup(
      'twitterImage',
      'Card image URL',
      'Leave empty to reuse the share image.',
      pageSeoRecord.twitterImage,
    ),
  ].join('');

export default buildPageTwitterFieldsMarkup;
