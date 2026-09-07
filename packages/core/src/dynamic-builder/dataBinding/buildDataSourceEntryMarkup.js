import buildDataSourceFieldsMarkup from './buildDataSourceFieldsMarkup.js';
import buildDataSourceJsonMarkup from './buildDataSourceJsonMarkup.js';
import buildDataSourcePasteMarkup from './buildDataSourcePasteMarkup.js';
import buildDataSourceTableMarkup from './buildDataSourceTableMarkup.js';
import buildDataSourceTokenHint from './buildDataSourceTokenHint.js';
import describeDataSourceUsage from './describeDataSourceUsage.js';
import describeDataSourceValue from './describeDataSourceValue.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildModeTab = (modeName, labelText, isActive) =>
  `<button type="button" class="gjs-db-button gjs-db-source-tab" role="tab" data-db-source-mode="${modeName}" ` +
  `aria-selected="${isActive ? 'true' : 'false'}">${labelText}</button>`;

const buildBodyMarkup = (sourceEntry) => {
  if (sourceEntry.mode === 'json') {
    return buildDataSourceJsonMarkup(sourceEntry.name, sourceEntry.jsonText, sourceEntry.jsonError);
  }
  if (Array.isArray(sourceEntry.value)) {
    return buildDataSourceTableMarkup(sourceEntry.value) + buildDataSourcePasteMarkup(Boolean(sourceEntry.pasteOpen));
  }
  return buildDataSourceFieldsMarkup(sourceEntry.value);
};

const buildDataSourceEntryMarkup = (sourceEntry, usageRecord) => {
  const safeName = escapeHtmlText(sourceEntry.name);
  const tokenHint = buildDataSourceTokenHint(sourceEntry.name, sourceEntry.value);
  const itemHint = tokenHint.itemToken
    ? ` Inside a repeater use <code>${escapeHtmlText(tokenHint.itemToken)}</code>.`
    : '';
  return [
    `<section class="gjs-db-source-panel" data-db-source-entry="${safeName}" aria-label="Data source ${safeName}">`,
    '<div class="gjs-db-source-head">',
    `<span class="gjs-db-source-name">${safeName}</span>`,
    `<span class="gjs-db-badge" data-db-source-count>${escapeHtmlText(describeDataSourceValue(sourceEntry.value))}</span>`,
    `<span class="gjs-db-muted gjs-db-source-usage">${escapeHtmlText(describeDataSourceUsage(usageRecord))}</span>`,
    '<div class="gjs-db-source-actions">',
    `<div class="gjs-db-source-tabs" role="tablist" aria-label="Editor for ${safeName}">`,
    buildModeTab('table', 'Table', sourceEntry.mode !== 'json'),
    buildModeTab('json', 'Advanced', sourceEntry.mode === 'json'),
    '</div>',
    '<button type="button" class="gjs-db-button" data-db-source-import>Import file</button>',
    '<input type="file" hidden data-db-source-import-input accept=".json,.csv,.tsv,.txt,application/json,text/csv">',
    '<button type="button" class="gjs-db-button" data-db-source-download>Download JSON</button>',
    `<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-source-delete aria-label="Delete source ${safeName}">Delete</button>`,
    '</div></div>',
    `<div class="gjs-db-source-body" data-db-source-body>${buildBodyMarkup(sourceEntry)}</div>`,
    '<p class="gjs-db-field-help gjs-db-muted gjs-db-source-hint">',
    `Show a value anywhere with <code>${escapeHtmlText(tokenHint.exampleToken)}</code>.${itemHint} `,
    `<button type="button" class="gjs-db-button gjs-db-button-small" data-db-source-copy-token="${escapeHtmlText(tokenHint.exampleToken)}">Copy token</button>`,
    '</p></section>',
  ].join('');
};

export default buildDataSourceEntryMarkup;
