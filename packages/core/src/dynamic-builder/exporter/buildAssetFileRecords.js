import buildExportStyleText from './buildExportStyleText.js';
import buildRobotsTxtContent from '../seo/buildRobotsTxtContent.js';
import buildSiteScriptText from './buildSiteScriptText.js';
import buildSitemapXmlContent from '../seo/buildSitemapXmlContent.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import listAssetDescriptorRecords from './listAssetDescriptorRecords.js';

const buildAssetFileRecords = (editor, buildOptions, targetAssetId) => {
  const optionsRecord = buildOptions || {};
  const siteScriptText =
    optionsRecord.siteScriptText !== undefined
      ? optionsRecord.siteScriptText
      : buildSiteScriptText(editor, optionsRecord);
  const includeBackupFiles = optionsRecord.includeProjectBackup === true;
  const buildAssetContent = (assetId) => {
    if (assetId === 'styles') return buildExportStyleText(editor, null, optionsRecord);
    if (assetId === 'siteScript') return siteScriptText;
    if (assetId === 'sitemap') return buildSitemapXmlContent(editor);
    if (assetId === 'robots') return buildRobotsTxtContent(editor);
    const siteMetaRecord = getSiteMetaRecord(editor);
    if (assetId === 'project') {
      return JSON.stringify({ projectData: editor.getProjectData(), siteMeta: siteMetaRecord }, null, 2);
    }
    const designTokens = isPlainRecord(siteMetaRecord.designTokens) ? siteMetaRecord.designTokens : {};
    return JSON.stringify(designTokens, null, 2);
  };
  return listAssetDescriptorRecords(!!siteScriptText)
    .filter((assetDescriptor) => (targetAssetId ? assetDescriptor.assetId === targetAssetId : true))
    .filter((assetDescriptor) => (targetAssetId ? true : includeBackupFiles || !assetDescriptor.isBackup))
    .map((assetDescriptor) => ({
      assetId: assetDescriptor.assetId,
      fileName: assetDescriptor.fileName,
      mimeType: assetDescriptor.mimeType,
      content: buildAssetContent(assetDescriptor.assetId),
    }));
};

export default buildAssetFileRecords;
