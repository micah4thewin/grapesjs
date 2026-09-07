import formatFaqCountText from './formatFaqCountText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildFaqFieldsMarkup = (faqEntryCount) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="FAQPage" hidden>',
    '<div class="gjs-db-schema-title-row">',
    getIconMarkup('faq', { size: 16 }),
    '<span class="gjs-db-muted">Questions and answers are taken automatically from accordion',
    ' blocks on this page. Edit the accordion text on the canvas to change them.</span>',
    '</div>',
    '<span class="gjs-db-status" data-db-schema-faq-count role="status">' +
      formatFaqCountText(faqEntryCount) +
      '</span>',
    '</div>',
  ].join('');

export default buildFaqFieldsMarkup;
