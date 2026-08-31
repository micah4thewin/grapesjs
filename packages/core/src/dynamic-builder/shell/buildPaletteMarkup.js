const buildPaletteMarkup = () =>
  [
    '<div class="gjs-db-palette" data-db-palette>',
    '<input type="text" class="gjs-db-palette-input" data-db-palette-input',
    ' placeholder="Type a command\u2026" aria-label="Search actions" role="combobox"',
    ' aria-expanded="true" aria-controls="db-palette-listbox" aria-autocomplete="list"',
    ' autocomplete="off" spellcheck="false" />',
    '<ul class="gjs-db-palette-list" id="db-palette-listbox" role="listbox" aria-label="Actions"',
    ' data-db-palette-list></ul>',
    '</div>',
  ].join('');

export default buildPaletteMarkup;
