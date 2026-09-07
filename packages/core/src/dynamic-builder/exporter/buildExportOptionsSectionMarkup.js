import buildExportCheckboxMarkup from './buildExportCheckboxMarkup.js';
import buildExportCustomScriptsStatusMarkup from './buildExportCustomScriptsStatusMarkup.js';
import getSiteCustomCodeRecord from './getSiteCustomCodeRecord.js';

const buildExportOptionsSectionMarkup = (editor) => {
  const allowScripts = getSiteCustomCodeRecord(editor).allowScripts;
  return [
    '<section class="gjs-db-export-section">',
    '<div class="gjs-db-section-title">Options</div>',
    buildExportCheckboxMarkup(
      'separateAssets',
      'Use shared style and script files',
      'Every page links to one styles.css and one site.js, and page downloads include them. ' +
        'Turn this off to get self-contained pages that carry their own styles and scripts.',
      true,
    ),
    buildExportCheckboxMarkup(
      'resolveBindings',
      'Fill in live data',
      'Replaces data placeholders with the real content from your data sources, so visitors see finished pages.',
      true,
    ),
    buildExportCheckboxMarkup(
      'includeProjectBackup',
      'Include backup files',
      'Adds project.json and design-tokens.json so you can restore or hand over the project. ' +
        'Leave this off for files you upload to a public host.',
      false,
    ),
    buildExportCustomScriptsStatusMarkup(allowScripts),
    '</section>',
  ].join('');
};

export default buildExportOptionsSectionMarkup;
