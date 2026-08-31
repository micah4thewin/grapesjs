const buildSaveRevisionFormMarkup = () =>
  [
    '<form class="gjs-db-form" data-db-save-revision-form>',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-revision-label-input">Revision label</label>',
    '<input class="gjs-db-field-input" id="db-revision-label-input" type="text" maxlength="80"',
    ' placeholder="Optional label" data-db-revision-label-input />',
    '<p class="gjs-db-field-help">Leave empty to use an automatic timestamp label.</p>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-revision-save>Save revision</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-cancel>Cancel</button>',
    '</div>',
    '</form>',
  ].join('');

export default buildSaveRevisionFormMarkup;
