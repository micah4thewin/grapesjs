import buildAssetFileRecords from './buildAssetFileRecords.js';
import buildPageFileRecords from './buildPageFileRecords.js';
import buildSiteScriptText from './buildSiteScriptText.js';

const buildPageExportRecords = (editor, buildOptions, targetPageId) => {
  const optionsRecord = buildOptions || {};
  if (!optionsRecord.separateAssets) return buildPageFileRecords(editor, optionsRecord, targetPageId);
  const sharedOptions = { ...optionsRecord, siteScriptText: buildSiteScriptText(editor, optionsRecord) };
  const pageRecords = buildPageFileRecords(editor, sharedOptions, targetPageId);
  const sharedAssetRecords = ['styles', 'siteScript'].flatMap((assetId) =>
    buildAssetFileRecords(editor, sharedOptions, assetId),
  );
  return pageRecords.concat(sharedAssetRecords.filter((assetRecord) => assetRecord && assetRecord.content));
};

export default buildPageExportRecords;
