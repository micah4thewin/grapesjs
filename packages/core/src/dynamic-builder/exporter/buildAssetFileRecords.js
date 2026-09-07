import buildExportStyleText from './buildExportStyleText.js';
import buildRobotsTxtContent from '../seo/buildRobotsTxtContent.js';
import buildSiteScriptText from './buildSiteScriptText.js';
import buildSitemapXmlContent from '../seo/buildSitemapXmlContent.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import hasSiteAddress from './hasSiteAddress.js';
import listAssetDescriptorRecords from './listAssetDescriptorRecords.js';
import resolveExportDesignTokens from './resolveExportDesignTokens.js';

const buildAssetFileRecords = (editor, buildOptions, targetAssetId) => {
  const optionsRecord = buildOptions || {};
  const siteScriptText =
    optionsRecord.siteScriptText !== undefined
      ? optionsRecord.siteScriptText
      : buildSiteScriptText(editor, optionsRecord);
  const includeBackupFiles = optionsRecord.includeProjectBackup === true;
  const usesSharedAssets = optionsRecord.separateAssets !== false;
  const includesSitemap = optionsRecord.includeEmptySitemap === true || hasSiteAddress(editor);
  const buildAssetContent = (assetId) => {
    if (assetId === 'styles') return buildExportStyleText(editor, null, optionsRecord);
    if (assetId === 'siteScript') return siteScriptText;
    if (assetId === 'sitemap') return buildSitemapXmlContent(editor);
    if (assetId === 'robots') return buildRobotsTxtContent(editor);
    if (assetId === 'project') {
      return JSON.stringify({ projectData: editor.getProjectData(), siteMeta: getSiteMetaRecord(editor) }, null, 2);
    }
    return JSON.stringify(resolveExportDesignTokens(editor), null, 2);
  };
  const belongsInBundle = (assetDescriptor) => {
    if (assetDescriptor.isBackup && !includeBackupFiles) return false;
    if (!usesSharedAssets && (assetDescriptor.assetId === 'styles' || assetDescriptor.assetId === 'siteScript')) {
      return false;
    }
    return assetDescriptor.assetId !== 'sitemap' || includesSitemap;
  };
  return listAssetDescriptorRecords(!!siteScriptText)
    .filter((assetDescriptor) => (targetAssetId ? assetDescriptor.assetId === targetAssetId : true))
    .filter((assetDescriptor) => (targetAssetId ? true : belongsInBundle(assetDescriptor)))
    .map((assetDescriptor) => ({
      assetId: assetDescriptor.assetId,
      fileName: assetDescriptor.fileName,
      mimeType: assetDescriptor.mimeType,
      content: buildAssetContent(assetDescriptor.assetId),
    }));
};

export default buildAssetFileRecords;
