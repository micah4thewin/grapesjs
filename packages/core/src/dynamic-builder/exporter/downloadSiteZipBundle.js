import buildExportBundleRecords from './buildExportBundleRecords.js';
import buildZipArchiveBytes from './buildZipArchiveBytes.js';
import downloadBlobFile from '../support/downloadBlobFile.js';

const downloadSiteZipBundle = (editor, buildOptions) => {
  const resolvedOptions = { separateAssets: true, resolveBindings: true, ...(buildOptions || {}) };
  const bundleRecords = buildExportBundleRecords(editor, resolvedOptions).filter(Boolean);
  if (!bundleRecords.length) return false;
  const archiveBytes = buildZipArchiveBytes(bundleRecords, new Date());
  downloadBlobFile('site.zip', new Blob([archiveBytes], { type: 'application/zip' }));
  editor.trigger('db:export:complete', {
    kind: 'zip',
    fileNames: bundleRecords.map((bundleRecord) => bundleRecord.fileName),
  });
  return true;
};

export default downloadSiteZipBundle;
