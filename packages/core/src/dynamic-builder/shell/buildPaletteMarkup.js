const buildPaletteMarkup = (instanceSuffix) => {
  const listboxId = 'db-palette-listbox' + (instanceSuffix || '');
  return [
    '<div class="gjs-db-palette" data-db-palette data-db-palette-scope="' + (instanceSuffix || 'main') + '">',
    '<input type="text" class="gjs-db-palette-input" data-db-palette-input',
    ' placeholder="Type a command\u2026" aria-label="Search actions" role="combobox"',
    ' aria-expanded="true" aria-controls="' + listboxId + '" aria-autocomplete="list"',
    ' autocomplete="off" spellcheck="false" />',
    '<ul class="gjs-db-palette-list" id="' + listboxId + '" role="listbox" aria-label="Actions"',
    ' data-db-palette-list></ul>',
    '</div>',
  ].join('');
};

export default buildPaletteMarkup;
