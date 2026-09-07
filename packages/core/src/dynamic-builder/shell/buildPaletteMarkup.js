import buildKeyChipsMarkup from './buildKeyChipsMarkup.js';

const buildPaletteMarkup = (instanceSuffix) => {
  const listboxId = 'db-palette-listbox' + (instanceSuffix || '');
  const hintsId = 'db-palette-hints' + (instanceSuffix || '');
  return [
    '<div class="gjs-db-palette" data-db-palette data-db-palette-scope="' + (instanceSuffix || 'main') + '">',
    '<input type="text" class="gjs-db-palette-input" data-db-palette-input',
    ' placeholder="Search actions, pages and devices\u2026" aria-label="Search actions" role="combobox"',
    ' aria-expanded="true" aria-controls="' + listboxId + '" aria-autocomplete="list"',
    ' aria-describedby="' + hintsId + '" autocomplete="off" spellcheck="false" />',
    '<ul class="gjs-db-palette-list" id="' + listboxId + '" role="listbox" aria-label="Actions"',
    ' tabindex="-1" data-db-palette-list></ul>',
    '<div class="gjs-db-palette-footer" id="' + hintsId + '">',
    '<span>' + buildKeyChipsMarkup('\u2191+\u2193') + ' Move</span>',
    '<span>' + buildKeyChipsMarkup('\u21B5') + ' Run</span>',
    '<span>' + buildKeyChipsMarkup('Esc') + ' Close</span>',
    '<span>' + buildKeyChipsMarkup('>') + ' Pages</span>',
    '<span>' + buildKeyChipsMarkup('@') + ' Devices</span>',
    '<span>' + buildKeyChipsMarkup('#') + ' Blocks</span>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildPaletteMarkup;
