import escapeHtmlText from '../support/escapeHtmlText.js';
import getPreviewShellCss from './getPreviewShellCss.js';
import getPreviewShellScriptText from './getPreviewShellScriptText.js';
import serializeJsonForScript from '../support/serializeJsonForScript.js';

const buildPreviewShellDocument = (siteName, pageRecords) => {
  const pageMap = {};
  pageRecords.forEach((pageRecord) => {
    pageMap[pageRecord.fileName] = String(pageRecord.content || '');
  });
  const optionMarkup = pageRecords
    .map(
      (pageRecord) =>
        '<option value="' +
        escapeHtmlText(pageRecord.fileName) +
        '">' +
        escapeHtmlText(pageRecord.pageName || pageRecord.fileName) +
        '</option>',
    )
    .join('');
  const widthButtons = [
    { widthValue: '390', labelText: 'Phone' },
    { widthValue: '820', labelText: 'Tablet' },
    { widthValue: '', labelText: 'Full width' },
  ]
    .map(
      (widthRecord) =>
        '<button type="button" data-db-preview-width="' +
        widthRecord.widthValue +
        '" aria-pressed="' +
        (widthRecord.widthValue ? 'false' : 'true') +
        '">' +
        widthRecord.labelText +
        '</button>',
    )
    .join('');
  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>Preview: ' + escapeHtmlText(siteName || 'your site') + '</title>',
    '<style>' + getPreviewShellCss() + '</style>',
    '</head>',
    '<body>',
    '<div class="db-preview-bar">',
    '<strong>Preview</strong>',
    '<label>Page <select data-db-preview-select aria-label="Page to preview">' + optionMarkup + '</select></label>',
    '<span role="group" aria-label="Preview width">' + widthButtons + '</span>',
    '<span data-db-preview-errors aria-live="polite">No script errors</span>',
    '<span class="db-preview-hint">Links between pages work here. Forms and other services need a real host.</span>',
    '</div>',
    '<div class="db-preview-stage"><div data-db-preview-host>',
    '<iframe data-db-preview-frame title="Site preview"></iframe>',
    '</div></div>',
    '<script type="application/json" data-db-preview-pages>' + serializeJsonForScript(pageMap, 0) + '</script>',
    '<script>' + getPreviewShellScriptText() + '</script>',
    '</body>',
    '</html>',
  ].join('\n');
};

export default buildPreviewShellDocument;
