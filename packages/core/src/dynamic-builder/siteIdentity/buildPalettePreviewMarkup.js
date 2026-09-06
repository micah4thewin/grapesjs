import escapeHtmlText from '../support/escapeHtmlText.js';

const buildPalettePreviewMarkup = (paletteRecord) => {
  const swatchKeys = ['brand', 'accent', 'surface', 'surfaceAlt', 'text', 'textMuted'];
  const swatchesMarkup = swatchKeys
    .map((swatchKey) => {
      const colorValue = escapeHtmlText(paletteRecord[swatchKey] || '#000000');
      return `<span class="gjs-db-identity-swatch" title="${swatchKey}: ${colorValue}" style="background:${colorValue}"></span>`;
    })
    .join('');
  const previewStyle = `background:${escapeHtmlText(paletteRecord.surface)};color:${escapeHtmlText(paletteRecord.text)};border-color:${escapeHtmlText(paletteRecord.line)}`;
  const buttonStyle = `background:${escapeHtmlText(paletteRecord.brand)};color:${escapeHtmlText(paletteRecord.brandContrast)}`;
  return [
    `<div class="gjs-db-identity-swatches">${swatchesMarkup}</div>`,
    `<div class="gjs-db-identity-preview" style="${previewStyle}">`,
    '<strong data-db-identity-preview-name>Your site name</strong>',
    `<span style="color:${escapeHtmlText(paletteRecord.textMuted)}" data-db-identity-preview-tagline>A short line about what you do</span>`,
    `<span class="gjs-db-identity-preview-button" style="${buttonStyle}">Get started</span>`,
    '</div>',
  ].join('');
};

export default buildPalettePreviewMarkup;
