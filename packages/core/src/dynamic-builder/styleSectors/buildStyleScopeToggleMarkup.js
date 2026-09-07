const buildStyleScopeToggleMarkup = () =>
  [
    '<div class="gjs-db-style-scope" data-db-style-scope role="group" aria-label="Where style changes apply">',
    '<span class="gjs-db-style-scope-label">Apply changes to</span>',
    '<div class="gjs-db-style-scope-buttons">',
    '<button type="button" class="gjs-db-style-scope-button" data-db-style-scope-mode="element" aria-pressed="true">',
    'This element only',
    '</button>',
    '<button type="button" class="gjs-db-style-scope-button" data-db-style-scope-mode="class" aria-pressed="false">',
    'All with this class',
    '</button>',
    '</div>',
    '<span class="gjs-db-style-scope-hint gjs-db-muted" data-db-style-scope-hint></span>',
    '</div>',
  ].join('');

export default buildStyleScopeToggleMarkup;
