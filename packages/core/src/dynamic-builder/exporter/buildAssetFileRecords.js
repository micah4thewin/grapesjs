import buildExportStyleText from './buildExportStyleText.js';
import buildRobotsTxtContent from '../seo/buildRobotsTxtContent.js';
import buildSiteScriptText from './buildSiteScriptText.js';
import buildSitemapXmlContent from '../seo/buildSitemapXmlContent.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildAssetFileRecords = (editor, buildOptions, targetAssetId) => {
  const siteMetaRecord = getSiteMetaRecord(editor);
  const designTokens = isPlainRecord(siteMetaRecord.designTokens) ? siteMetaRecord.designTokens : {};
  const projectRecord = { projectData: editor.getProjectData(), siteMeta: siteMetaRecord };
  const siteScriptText = buildSiteScriptText(editor, buildOptions);
  const assetRecords = [
    {
      assetId: 'styles',
      fileName: 'styles.css',
      mimeType: 'text/css',
      content: buildExportStyleText(editor, null, buildOptions),
    },
    {
      assetId: 'project',
      fileName: 'project.json',
      mimeType: 'application/json',
      content: JSON.stringify(projectRecord, null, 2),
    },
    {
      assetId: 'tokens',
      fileName: 'design-tokens.json',
      mimeType: 'application/json',
      content: JSON.stringify(designTokens, null, 2),
    },
    {
      assetId: 'sitemap',
      fileName: 'sitemap.xml',
      mimeType: 'application/xml',
      content: buildSitemapXmlContent(editor),
    },
    { assetId: 'robots', fileName: 'robots.txt', mimeType: 'text/plain', content: buildRobotsTxtContent(editor) },
  ];
  if (siteScriptText) {
    assetRecords.splice(1, 0, {
      assetId: 'siteScript',
      fileName: 'site.js',
      mimeType: 'text/javascript',
      content: siteScriptText,
    });
  }
  return assetRecords.filter((assetRecord) => !targetAssetId || assetRecord.assetId === targetAssetId);
};

export default buildAssetFileRecords;
