import escapeHtmlText from '../support/escapeHtmlText.js';
import listAssetDescriptorRecords from './listAssetDescriptorRecords.js';

const buildExportAssetsSectionMarkup = () => {
  const assetRows = listAssetDescriptorRecords(true).map((assetDescriptor) =>
    [
      '<div class="gjs-db-list-item gjs-db-export-row">',
      '<span class="gjs-db-export-name">',
      '<span>' + escapeHtmlText(assetDescriptor.label) + '</span>',
      '<span class="gjs-db-muted">' + escapeHtmlText(assetDescriptor.fileName) + '</span>',
      '</span>',
      '<button type="button" class="gjs-db-button" data-db-export-action="asset" data-db-export-asset="' +
        escapeHtmlText(assetDescriptor.assetId) +
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
