import escapeHtmlText from '../support/escapeHtmlText.js';

const buildDesignKitCardMarkup = (kitRecord) => {
  const colorRecord = kitRecord.tokens.color || {};
  const swatchesMarkup = ['brand', 'accent', 'surfaceAlt', 'text']
    .map((colorName) => {
      const colorValue = colorRecord[colorName];
      return colorValue
        ? `<span class="gjs-db-kit-swatch" style="background-color:${escapeHtmlText(colorValue)}"></span>`
        : '';
    })
    .join('');
  const displayFont = escapeHtmlText((kitRecord.tokens.font || {}).display || '');
  return [
    `<button type="button" class="gjs-db-kit-card" data-db-kit-id="${escapeHtmlText(kitRecord.kitId)}">`,
    `<span class="gjs-db-kit-preview" style="font-family:${displayFont}">Aa</span>`,
    '<span class="gjs-db-kit-body">',
    `<span class="gjs-db-kit-name">${escapeHtmlText(kitRecord.kitName)}</span>`,
    `<span class="gjs-db-block-hint">${escapeHtmlText(kitRecord.kitHint)}</span>`,
    '</span>',
    `<span class="gjs-db-kit-swatches">${swatchesMarkup}</span>`,
    '</button>',
  ].join('');
};

export default buildDesignKitCardMarkup;
