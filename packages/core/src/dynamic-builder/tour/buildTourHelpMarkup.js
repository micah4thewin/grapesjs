const buildTourHelpMarkup = () =>
  [
    '<button type="button" class="gjs-db-tour-help" data-db-tour-help',
    ' title="Show me around the editor" aria-label="Show me around the editor">',
    '<span class="gjs-db-tour-help-mark" aria-hidden="true">?</span>',
    '</button>',
  ].join('');

export default buildTourHelpMarkup;
