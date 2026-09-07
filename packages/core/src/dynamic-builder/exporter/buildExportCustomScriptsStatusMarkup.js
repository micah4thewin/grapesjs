const buildExportCustomScriptsStatusMarkup = (allowScripts) =>
  [
    '<div class="gjs-db-field gjs-db-export-row">',
    '<span class="gjs-db-export-name">',
    '<span>Custom scripts: ' + (allowScripts ? 'on' : 'off') + '</span>',
    '<span class="gjs-db-muted">' +
      (allowScripts
        ? 'Scripts you added in Custom code are included in exports.'
        : 'Scripts you added in Custom code are left out of exports.') +
      '</span>',
    '</span>',
    '<button type="button" class="gjs-db-button" data-db-export-action="custom-code">Change in Custom code</button>',
    '</div>',
  ].join('');

export default buildExportCustomScriptsStatusMarkup;
