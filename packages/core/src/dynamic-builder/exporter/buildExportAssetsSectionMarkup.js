import buildAssetFileRecords from './buildAssetFileRecords.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildExportAssetsSectionMarkup = (editor) => {
  const assetLabels = {
    styles: 'Site stylesheet',
    siteScript: 'Site scripts',
    project: 'Project data with site meta',
    tokens: 'Design tokens',
    sitemap: 'Sitemap',
    robots: 'Robots directives',
  };
  const assetRows = buildAssetFileRecords(editor, {}).map((assetRecord) =>
    [
      '<div class="gjs-db-list-item gjs-db-export-row">',
      '<span class="gjs-db-export-name">',
      '<span>' + escapeHtmlText(assetLabels[assetRecord.assetId] || assetRecord.fileName) + '</span>',
      '<span class="gjs-db-muted">' + escapeHtmlText(assetRecord.fileName) + '</span>',
      '</span>',
      '<button type="button" class="gjs-db-button" data-db-export-action="asset" data-db-export-asset="' +
        escapeHtmlText(assetRecord.assetId) +
        '">Download</button>',
      '</div>',
    ].join(''),
  );
  return [
    '<section class="gjs-db-export-section">',
    '<div class="gjs-db-section-title">Assets</div>',
    '<div class="gjs-db-list">' + assetRows.join('') + '</div>',
    '</section>',
  ].join('');
};

export default buildExportAssetsSectionMarkup;
