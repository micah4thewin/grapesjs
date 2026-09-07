import describeCustomFontRecord from './describeCustomFontRecord.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildCustomFontListMarkup = (fontRecords) => {
  if (!fontRecords.length) {
    return '<p class="gjs-db-muted">No fonts added yet. Your fonts appear here and in the Fonts window.</p>';
  }
  return fontRecords
    .map((fontRecord) => {
      const safeFamily = escapeHtmlText(fontRecord.family);
      const sampleStyle = [
        'font-family:' + safeFamily,
        'font-weight:' + fontRecord.weight,
        'font-style:' + fontRecord.style,
      ].join(';');
      return [
        '<div class="gjs-db-custom-card">',
        `<span class="gjs-db-custom-sample" style="${sampleStyle}">Aa Quick brown fox</span>`,
        '<span class="gjs-db-custom-card-meta">',
        `<strong>${safeFamily}</strong>`,
        `<em>${escapeHtmlText(describeCustomFontRecord(fontRecord))}</em>`,
        '</span>',
        '<button type="button" class="gjs-db-button gjs-db-button-danger"',
        ` data-db-custom-delete="fonts" data-db-custom-id="${escapeHtmlText(fontRecord.fontId)}"`,
        ` aria-label="Delete ${safeFamily} ${fontRecord.weight}">Delete</button>`,
        '</div>',
      ].join('');
    })
    .join('');
};

export default buildCustomFontListMarkup;
