import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSeoTabButtonMarkup = (tabName, labelText) =>
  [
    '<button type="button" class="gjs-db-button" role="tab" id="gjs-db-seo-tab-' + tabName + '"',
    ' aria-controls="gjs-db-seo-panel-' + tabName + '" aria-selected="false" tabindex="-1"',
    ' data-db-seo-tab="' + tabName + '">',
    escapeHtmlText(labelText),
    '</button>',
  ].join('');

export default buildSeoTabButtonMarkup;
