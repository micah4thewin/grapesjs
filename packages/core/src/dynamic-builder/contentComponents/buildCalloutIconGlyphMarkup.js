import getIconMarkup from '../support/getIconMarkup.js';

const buildCalloutIconGlyphMarkup = () => {
  const variantIconPairs = [
    ['info', 'info'],
    ['success', 'check'],
    ['warning', 'warning'],
    ['error', 'warning'],
  ];
  return variantIconPairs
    .map(
      ([variantName, iconName]) =>
        `<span class="db-callout-glyph" data-db-glyph="${variantName}">${getIconMarkup(iconName, { size: 20 })}</span>`,
    )
    .join('');
};

export default buildCalloutIconGlyphMarkup;
