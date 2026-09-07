import buildExportBundleRecords from './buildExportBundleRecords.js';
import buildSiteArchiveFileName from './buildSiteArchiveFileName.js';
import downloadRecordsAsZip from './downloadRecordsAsZip.js';
import showToastNotice from '../support/showToastNotice.js';

const downloadSiteZipBundle = (editor, buildOptions, bundleOptions = {}) => {
  const resolvedOptions = { separateAssets: true, resolveBindings: true, ...(buildOptions || {}) };
  const bundleRecords = buildExportBundleRecords(editor, resolvedOptions).filter(Boolean);
  if (!bundleRecords.length) {
    showToastNotice(editor, 'Nothing to download for this site yet', { kind: 'warning' });
    return false;
  }
  return downloadRecordsAsZip(editor, bundleRecords, 'zip', buildSiteArchiveFileName(editor), {
    preflight: bundleOptions.preflight || null,
  });
};

export default downloadSiteZipBundle;
