import buildExportCheckboxMarkup from './buildExportCheckboxMarkup.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';

const buildExportOptionsSectionMarkup = (editor) => {
  const allowScripts = getSiteCustomCodeRecord(editor).allowScripts;
  return [
    '<section class="gjs-db-export-section">',
    '<div class="gjs-db-section-title">Options</div>',
    buildExportCheckboxMarkup(
      'separateAssets',
      'Separate assets',
      'Link styles.css and site.js from every page instead of inlining styles and scripts.',
      false,
      false,
    ),
    buildExportCheckboxMarkup(
      'resolveBindings',
      'Resolve data bindings',
      'Replace binding tokens with values from the data source registry in the exported markup.',
      true,
      false,
    ),
    buildExportCheckboxMarkup(
      'includeCustomScripts',
      'Include custom scripts',
      'Read only. Mirrors the allow scripts flag from the Custom code settings.',
      allowScripts,
      true,
    ),
    '</section>',
  ].join('');
};

export default buildExportOptionsSectionMarkup;
