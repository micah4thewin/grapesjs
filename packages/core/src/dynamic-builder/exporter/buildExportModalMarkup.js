import buildExportAssetsSectionMarkup from './buildExportAssetsSectionMarkup.js';
import buildExportOptionsSectionMarkup from './buildExportOptionsSectionMarkup.js';
import buildExportPagesSectionMarkup from './buildExportPagesSectionMarkup.js';

const buildExportModalMarkup = (editor) =>
  [
    '<div class="gjs-db-form" data-db-export-root>',
    buildExportPagesSectionMarkup(editor),
    buildExportAssetsSectionMarkup(),
    buildExportOptionsSectionMarkup(editor),
    '<div class="gjs-db-button-row">',
    '<button type="button" class="gjs-db-button gjs-db-button-primary" data-db-export-action="download-zip">',
    'Download site (.zip)</button>',
    '<button type="button" class="gjs-db-button" data-db-export-action="publish">Publish</button>',
    '</div>',
    '</div>',
  ].join('');

export default buildExportModalMarkup;
