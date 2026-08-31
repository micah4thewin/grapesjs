import escapeHtmlText from '../support/escapeHtmlText.js';

const buildDataSourceEntryMarkup = (sourceName, sourceValue) => {
  const safeName = escapeHtmlText(sourceName);
  let jsonText = '[]';
  try {
    jsonText = JSON.stringify(sourceValue == null ? [] : sourceValue, null, 2);
  } catch {
    jsonText = '[]';
  }
  return [
    `<div class="gjs-db-list-item gjs-db-field" data-db-source-entry="${safeName}">`,
    '<div class="gjs-db-grid-two">',
    `<span class="gjs-db-field-label">${safeName}</span>`,
    '<button type="button" class="gjs-db-button gjs-db-button-danger" ',
    `data-db-source-delete="${safeName}" aria-label="Delete source ${safeName}">Delete</button>`,
    '</div>',
    `<textarea class="gjs-db-field-input" data-db-source-json="${safeName}" rows="7" spellcheck="false" `,
    `aria-label="JSON for source ${safeName}">${escapeHtmlText(jsonText)}</textarea>`,
    `<p class="gjs-db-field-help gjs-db-muted">Bind with tokens like {{db:${safeName}.0.field}}</p>`,
    '</div>',
  ].join('');
};

export default buildDataSourceEntryMarkup;
