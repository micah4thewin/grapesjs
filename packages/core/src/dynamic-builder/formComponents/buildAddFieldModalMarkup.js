import escapeHtmlText from '../support/escapeHtmlText.js';
import getFieldPresetRecords from './getFieldPresetRecords.js';

const buildAddFieldModalMarkup = () =>
  [
    '<div class="gjs-db-form gjs-db-add-field">',
    '<p class="gjs-db-muted">Pick the kind of question you want to ask. You can change the wording afterwards.</p>',
    '<div class="gjs-db-add-field-grid">',
    getFieldPresetRecords()
      .map(
        (presetRecord) =>
          `<button type="button" class="gjs-db-button gjs-db-add-field-card" data-db-field-preset="${escapeHtmlText(presetRecord.id)}">` +
          `<strong>${escapeHtmlText(presetRecord.label)}</strong>` +
          `<span class="gjs-db-muted">${escapeHtmlText(presetRecord.hint)}</span>` +
          '</button>',
      )
      .join(''),
    '</div>',
    '</div>',
  ].join('');

export default buildAddFieldModalMarkup;
