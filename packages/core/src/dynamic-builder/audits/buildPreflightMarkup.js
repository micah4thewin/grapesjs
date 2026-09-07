import buildFindingListMarkup from './buildFindingListMarkup.js';
import buildSeverityCountsMarkup from './buildSeverityCountsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildPreflightFooterMarkup = (continueLabel) =>
  continueLabel
    ? '<div class="gjs-db-button-row gjs-db-preflight-footer">' +
      '<button type="button" class="gjs-db-button" data-db-preflight-cancel>Keep editing</button>' +
      '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-preflight-continue>' +
      escapeHtmlText(continueLabel) +
      '</button></div>'
    : '';

const buildPreflightMarkup = (preflightResult, options) => {
  const optionsRecord = options || {};
  const items = Array.isArray(preflightResult.items) ? preflightResult.items : [];
  const headerMarkup = items.length
    ? buildSeverityCountsMarkup(preflightResult.counts) +
      '<span class="gjs-db-muted">' +
      items.length +
      (items.length === 1 ? ' thing' : ' things') +
      ' to check before you publish.</span>'
    : '<span class="gjs-db-badge gjs-db-badge-success">Ready to publish</span>' +
      '<span class="gjs-db-muted">Nothing is blocking the site from going live.</span>';
  return (
    '<div class="gjs-db-report gjs-db-audit-report gjs-db-preflight" data-db-preflight-root>' +
    '<div class="gjs-db-audit-header">' +
    '<div class="gjs-db-audit-counts">' +
    headerMarkup +
    '</div>' +
    '<div class="gjs-db-button-row">' +
    '<button type="button" class="gjs-db-button" data-db-audit-run="db:run-preflight">' +
    getIconMarkup('refresh', { size: 14 }) +
    'Check again</button>' +
    '</div>' +
    '</div>' +
    (items.length ? buildFindingListMarkup(items) : '') +
    '<p class="gjs-db-muted gjs-db-audit-empty">Fix takes you to the exact setting; Show selects the item on the canvas.</p>' +
    buildPreflightFooterMarkup(optionsRecord.continueLabel) +
    '</div>'
  );
};

export default buildPreflightMarkup;
