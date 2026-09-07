import buildAssetFileRecords from './buildAssetFileRecords.js';
import buildExportStyleText from './buildExportStyleText.js';
import buildPageFileRecords from './buildPageFileRecords.js';
import buildSiteScriptText from './buildSiteScriptText.js';
import collectInlineImageSizes from './collectInlineImageSizes.js';
import measureTextByteLength from './measureTextByteLength.js';

const resolveBudgetTone = (totalBytes) => {
  if (totalBytes <= 300 * 1024) return 'success';
  return totalBytes <= 1024 * 1024 ? 'warning' : 'error';
};

const buildExportSizeReport = (editor, buildOptions) => {
  try {
    const optionsRecord = { separateAssets: true, resolveBindings: true, ...(buildOptions || {}) };
    const sharedOptions = { ...optionsRecord, siteScriptText: buildSiteScriptText(editor, optionsRecord) };
    const pageRecords = buildPageFileRecords(editor, sharedOptions);
    const assetRecords = buildAssetFileRecords(editor, sharedOptions);
    const pageRows = pageRecords.map((pageRecord) => ({
      fileName: pageRecord.fileName,
      pageName: pageRecord.pageName,
      byteLength: measureTextByteLength(pageRecord.content),
      inlineImageSizes: collectInlineImageSizes(pageRecord.content),
    }));
    const assetRows = assetRecords.map((assetRecord) => ({
      fileName: assetRecord.fileName,
      byteLength: measureTextByteLength(assetRecord.content),
    }));
    const trimmedCssBytes = measureTextByteLength(buildExportStyleText(editor, null, sharedOptions));
    const fullCssBytes = measureTextByteLength(
      buildExportStyleText(editor, null, { ...sharedOptions, optimizeCss: false }),
    );
    const totalBytes =
      pageRows.reduce((totalSize, pageRow) => totalSize + pageRow.byteLength, 0) +
      assetRows.reduce((totalSize, assetRow) => totalSize + assetRow.byteLength, 0);
    const inlineImageSizes = pageRows
      .flatMap((pageRow) => pageRow.inlineImageSizes)
      .sort((firstSize, secondSize) => secondSize - firstSize);
    return {
      pageRows,
      assetRows,
      totalBytes,
      cssSavedBytes: Math.max(0, fullCssBytes - trimmedCssBytes),
      inlineImageCount: inlineImageSizes.length,
      largestInlineImageBytes: inlineImageSizes[0] || 0,
      budgetTone: resolveBudgetTone(totalBytes),
    };
  } catch (reportError) {
    return null;
  }
};

export default buildExportSizeReport;
