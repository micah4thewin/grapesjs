import buildSymbolCardActionsMarkup from './buildSymbolCardActionsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildSymbolCardMarkup = (symbolRecord, usageText, thumbnailMarkup) =>
  [
    '<li class="gjs-db-symbol-card">',
    '<span class="gjs-db-symbol-card-preview" aria-hidden="true">' + thumbnailMarkup + '</span>',
    '<span class="gjs-db-symbol-card-body">',
    '<span class="gjs-db-symbol-card-name">' + escapeHtmlText(symbolRecord.name) + '</span>',
    '<span class="gjs-db-symbol-card-meta">' + escapeHtmlText(usageText) + '</span>',
    '</span>',
    '<span class="gjs-db-symbol-card-actions">' + buildSymbolCardActionsMarkup(symbolRecord) + '</span>',
    '</li>',
  ].join('');

export default buildSymbolCardMarkup;
