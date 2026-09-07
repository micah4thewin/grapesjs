const buildSaveRevisionFormMarkup = () =>
  [
    '<form class="gjs-db-form" data-db-save-revision-form>',
    '<div class="gjs-db-field">',
    '<label class="gjs-db-field-label" for="db-revision-label-input">Revision name</label>',
    '<input class="gjs-db-field-input" id="db-revision-label-input" type="text" maxlength="80"',
    ' placeholder="For example: Before the spring redesign" data-db-revision-label-input',
    ' aria-describedby="db-revision-label-help db-revision-label-error" />',
    '<p class="gjs-db-field-help" id="db-revision-label-help">',
    'Leave empty to name it "Manual save". The time is recorded automatically.</p>',
    '<div class="gjs-db-field-help gjs-db-field-error-text" id="db-revision-label-error" role="alert"',
    ' data-db-revision-error></div>',
    '</div>',
    '<div class="gjs-db-button-row">',
    '<button type="submit" class="gjs-db-button gjs-db-button-primary" data-db-revision-save>Save revision</button>',
    '<button type="button" class="gjs-db-button" data-db-revision-cancel>Cancel</button>',
    '</div>',
    '</form>',
  ].join('');

export default buildSaveRevisionFormMarkup;
