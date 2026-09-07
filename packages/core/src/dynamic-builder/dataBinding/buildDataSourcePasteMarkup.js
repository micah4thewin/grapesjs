const buildDataSourcePasteMarkup = (isOpen) =>
  [
    `<div class="gjs-db-source-paste gjs-db-field" data-db-paste-area${isOpen ? '' : ' hidden'}>`,
    '<label class="gjs-db-field-label">Paste rows from a spreadsheet</label>',
    '<textarea class="gjs-db-field-input" data-db-paste-text rows="4" spellcheck="false" ',
    'aria-label="Rows copied from a spreadsheet"></textarea>',
    '<p class="gjs-db-field-help gjs-db-muted">Copy cells in Excel or Google Sheets and paste them here. ',
    'The first row holds the field names. Comma separated text works too.</p>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-paste-apply>Add pasted rows</button>',
    '</div></div>',
  ].join('');

export default buildDataSourcePasteMarkup;
