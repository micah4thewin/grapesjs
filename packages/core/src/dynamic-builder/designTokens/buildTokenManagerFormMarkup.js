import buildBrandPaletteStarterMarkup from './buildBrandPaletteStarterMarkup.js';
import buildTokenFieldMarkup from './buildTokenFieldMarkup.js';
import buildTokenGroupTabsMarkup from './buildTokenGroupTabsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildTokenManagerFormMarkup = (tokenRecord, baselineRecord) => {
  const safeRecord = isPlainRecord(tokenRecord) ? tokenRecord : {};
  const safeBaseline = isPlainRecord(baselineRecord) ? baselineRecord : {};
  const groupKeys = Object.keys(safeRecord).filter((groupKey) => isPlainRecord(safeRecord[groupKey]));
  const panelsMarkup = groupKeys
    .map((groupKey, groupIndex) => {
      const groupRecord = safeRecord[groupKey];
      const baselineGroup = isPlainRecord(safeBaseline[groupKey]) ? safeBaseline[groupKey] : {};
      const fieldsMarkup = Object.keys(groupRecord)
        .map((tokenName) => buildTokenFieldMarkup(groupKey, tokenName, groupRecord[tokenName], baselineGroup[tokenName]))
        .join('');
      const safeGroup = escapeHtmlText(groupKey);
      return [
        `<section class="gjs-db-token-panel" role="tabpanel" id="db-token-panel-${safeGroup}"`,
        ` aria-labelledby="db-token-tab-${safeGroup}" data-db-token-panel="${safeGroup}"${groupIndex ? ' hidden' : ''}>`,
        groupKey === 'color' ? buildBrandPaletteStarterMarkup() : '',
        `<div class="gjs-db-grid-two">${fieldsMarkup}</div>`,
        '</section>',
      ].join('');
    })
    .join('');
  return [
    '<form class="gjs-db-form gjs-db-token-form" data-db-token-form novalidate>',
    '<p class="gjs-db-muted">',
    'Colours, fonts, sizes and spacing for the whole site. The page previews every change as you type.',
    ' Press Done to keep your changes, or close this window to put everything back.',
    '</p>',
    buildTokenGroupTabsMarkup(groupKeys, groupKeys[0] || ''),
    panelsMarkup,
    '<div class="gjs-db-token-reset-confirm" data-db-token-reset-confirm hidden>',
    '<span>Reset every value to the built-in defaults? Your own edits will be lost.</span>',
    '<button type="button" class="gjs-db-button gjs-db-button-danger" data-db-token-reset-accept>Yes, reset</button>',
    '<button type="button" class="gjs-db-button" data-db-token-reset-cancel>Keep my values</button>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button" data-db-token-reset>Reset to defaults</button>',
    '<button type="button" class="gjs-db-button" data-db-token-revert>Revert changes</button>',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-token-apply>Done</button>',
    '</div>',
    '</form>',
  ].join('');
};

export default buildTokenManagerFormMarkup;
