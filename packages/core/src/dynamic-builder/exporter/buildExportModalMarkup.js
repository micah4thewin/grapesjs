import buildExportAssetsSectionMarkup from './buildExportAssetsSectionMarkup.js';
import buildExportOptionsSectionMarkup from './buildExportOptionsSectionMarkup.js';
import buildExportPagesSectionMarkup from './buildExportPagesSectionMarkup.js';

const buildExportModalMarkup = (editor) =>
  [
    '<div class="gjs-db-form" data-db-export-root>',
    '<p class="gjs-db-muted">Check and download gives you the whole site as a zip after a quick review. ',
    'The other buttons download single files.</p>',
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-export-action="publish"',
    ' data-db-autofocus>Check and download</button>',
    '<button type="button" class="gjs-db-button" data-db-export-action="download-zip">Download site (.zip)</button>',
    '<button type="button" class="gjs-db-button" data-db-export-action="preview">Preview in new tab</button>',
    '</div>',
    buildExportPagesSectionMarkup(editor),
    buildExportAssetsSectionMarkup(editor),
    buildExportOptionsSectionMarkup(editor),
    '</div>',
  ].join('');

export default buildExportModalMarkup;
