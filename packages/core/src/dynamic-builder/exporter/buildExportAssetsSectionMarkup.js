import buildSiteScriptText from './buildSiteScriptText.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import hasSiteAddress from './hasSiteAddress.js';
import listAssetDescriptorRecords from './listAssetDescriptorRecords.js';

const buildAssetRowMarkup = (labelText, captionText, buttonMarkup) =>
  [
    '<div class="gjs-db-list-item gjs-db-export-row">',
    '<span class="gjs-db-export-name">',
    '<span>' + escapeHtmlText(labelText) + '</span>',
    '<span class="gjs-db-muted">' + escapeHtmlText(captionText) + '</span>',
    '</span>',
    buttonMarkup,
    '</div>',
  ].join('');

const buildExportAssetsSectionMarkup = (editor) => {
  const hasSiteScript = !!buildSiteScriptText(editor, {});
  const siteHasAddress = hasSiteAddress(editor);
  const assetRows = listAssetDescriptorRecords(hasSiteScript).map((assetDescriptor) => {
    const captionText =
      assetDescriptor.assetId === 'sitemap' && !siteHasAddress
        ? assetDescriptor.fileName + ' (lists no pages until you set the site address in Site settings)'
        : assetDescriptor.fileName;
    return buildAssetRowMarkup(
      assetDescriptor.label,
      captionText,
      '<button type="button" class="gjs-db-button" data-db-export-action="asset" data-db-export-asset="' +
        escapeHtmlText(assetDescriptor.assetId) +
        '" aria-label="Download ' +
        escapeHtmlText(assetDescriptor.fileName) +
        '">Download</button>',
    );
  });
  if (!hasSiteScript) {
    assetRows.splice(
      1,
      0,
      buildAssetRowMarkup('Site scripts', 'No scripts on this site yet, so there is no site.js.', ''),
    );
  }
  return [
    '<details class="gjs-db-export-details gjs-db-export-section">',
    '<summary class="gjs-db-export-summary">Advanced files</summary>',
    '<div class="gjs-db-field-help">Extra files for hosting, search engines and backups. ',
    'The site zip already includes the ones it needs.</div>',
    '<div class="gjs-db-list">' + assetRows.join('') + '</div>',
    '</details>',
  ].join('');
};

export default buildExportAssetsSectionMarkup;
