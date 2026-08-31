import buildAssetFileRecords from './buildAssetFileRecords.js';
import buildPageFileRecords from './buildPageFileRecords.js';

const buildExportBundleRecords = (editor, buildOptions) => [
  ...buildPageFileRecords(editor, buildOptions),
  ...buildAssetFileRecords(editor, buildOptions),
];

export default buildExportBundleRecords;
