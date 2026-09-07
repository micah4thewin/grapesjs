import buildListRowMarkup from './buildListRowMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import readTabPairRecords from './readTabPairRecords.js';

const buildTabRowsMarkup = (tabsComponent) => {
  const pairRecords = readTabPairRecords(tabsComponent);
  if (!pairRecords.length) return '<p class="gjs-db-muted">No tabs yet. Add the first one below.</p>';
  const radioGroupName = 'db-tab-shown-first-' + escapeHtmlText(String(tabsComponent.getId ? tabsComponent.getId() : ''));
  return pairRecords
    .map((pairRecord, pairIndex) =>
      buildListRowMarkup(
        pairIndex,
        `<input class="gjs-db-field-input" data-db-list-field="label" value="${escapeHtmlText(pairRecord.labelText)}" placeholder="Tab name" aria-label="Tab name">` +
          '<label class="gjs-db-list-check">' +
          `<input type="radio" name="${radioGroupName}" data-db-list-field="selected"${pairRecord.isSelected ? ' checked' : ''}>` +
          '<span>Shown first</span></label>',
      ),
    )
    .join('');
};

export default buildTabRowsMarkup;
