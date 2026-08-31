const buildRevisionsModalMarkup = () =>
  [
    '<div class="gjs-db-revisions" data-db-revisions-root>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-revision-action="save-now">',
    'Save revision now</button>',
    '</div>',
    '<ul class="gjs-db-list" data-db-revision-list></ul>',
    '</div>',
  ].join('');

export default buildRevisionsModalMarkup;
