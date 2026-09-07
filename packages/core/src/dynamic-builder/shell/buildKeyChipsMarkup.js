import escapeHtmlText from '../support/escapeHtmlText.js';

const buildKeyChipsMarkup = (keysText) => {
  const glyphLabels = {
    '\u2318': 'Command',
    '\u21E7': 'Shift',
    '\u2325': 'Option',
    '\u2191': 'Up arrow',
    '\u2193': 'Down arrow',
    '\u2190': 'Left arrow',
    '\u2192': 'Right arrow',
    '\u21B5': 'Enter',
  };
  const variantsMarkup = String(keysText || '')
    .split(' or ')
    .map((variantText) => variantText.trim())
    .filter(Boolean)
    .map((variantText) =>
      variantText
        .split('+')
        .map((keyToken) => {
          const labelAttribute = glyphLabels[keyToken] ? ` aria-label="${glyphLabels[keyToken]}"` : '';
          return `<kbd class="gjs-db-key"${labelAttribute}>${escapeHtmlText(keyToken)}</kbd>`;
        })
        .join(''),
    )
    .join('<span class="gjs-db-key-join">or</span>');
  return variantsMarkup ? `<span class="gjs-db-keys">${variantsMarkup}</span>` : '';
};

export default buildKeyChipsMarkup;
