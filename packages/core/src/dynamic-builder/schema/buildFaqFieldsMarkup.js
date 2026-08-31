import getIconMarkup from '../support/getIconMarkup.js';

const buildFaqFieldsMarkup = (faqEntryCount) =>
  [
    '<div class="gjs-db-schema-group" data-db-schema-group="FAQPage" hidden>',
    '<div class="gjs-db-schema-title-row">',
    getIconMarkup('faq', { size: 16 }),
    '<span class="gjs-db-muted">Questions and answers are extracted automatically from accordion',
    ' components on this page. Edit the accordion content in the canvas to change them.</span>',
    '</div>',
    '<span class="gjs-db-status" data-db-schema-faq-count role="status">' +
      String(faqEntryCount || 0) +
      ' question and answer pairs found</span>',
    '</div>',
  ].join('');

export default buildFaqFieldsMarkup;
