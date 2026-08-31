import buildTokenFieldMarkup from './buildTokenFieldMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getTokenGroupLabel from './getTokenGroupLabel.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildTokenManagerFormMarkup = (tokenRecord) => {
  const safeRecord = isPlainRecord(tokenRecord) ? tokenRecord : {};
  const groupSectionsMarkup = Object.keys(safeRecord)
    .filter((groupKey) => isPlainRecord(safeRecord[groupKey]))
    .map((groupKey) => {
      const groupRecord = safeRecord[groupKey];
      const fieldsMarkup = Object.keys(groupRecord)
        .map((tokenName) => buildTokenFieldMarkup(groupKey, tokenName, groupRecord[tokenName]))
        .join('');
      return [
        '<section class="gjs-db-report-group">',
        `<h3 class="gjs-db-section-title">${escapeHtmlText(getTokenGroupLabel(groupKey))}</h3>`,
        `<div class="gjs-db-grid-two">${fieldsMarkup}</div>`,
        '</section>',
      ].join('');
    })
    .join('');
  return [
    '<form class="gjs-db-form" data-db-token-form>',
    '<p class="gjs-db-muted">Tokens publish as --db-* custom properties on :root of every page.</p>',
    groupSectionsMarkup,
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-token-reset>Reset to defaults</button>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-token-apply>Apply</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildTokenManagerFormMarkup;
