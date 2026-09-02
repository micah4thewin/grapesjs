import buildAssetFileRecords from './buildAssetFileRecords.js';
import buildPageFileRecords from './buildPageFileRecords.js';
import buildSiteScriptText from './buildSiteScriptText.js';

const buildExportBundleRecords = (editor, buildOptions) => {
  const optionsRecord = buildOptions || {};
  const sharedOptions = { ...optionsRecord, siteScriptText: buildSiteScriptText(editor, optionsRecord) };
  return [...buildPageFileRecords(editor, sharedOptions), ...buildAssetFileRecords(editor, sharedOptions)];
};

export default buildExportBundleRecords;
