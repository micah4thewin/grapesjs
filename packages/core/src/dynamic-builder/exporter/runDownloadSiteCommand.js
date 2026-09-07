import downloadSiteZipBundle from './downloadSiteZipBundle.js';
import openPublishModal from './openPublishModal.js';
import runExportPreflight from './runExportPreflight.js';
import showToastNotice from '../support/showToastNotice.js';

const runDownloadSiteCommand = (editor, commandOptions, moduleOptions) => {
  const optionsRecord = commandOptions || {};
  const buildOptions = optionsRecord.buildOptions || moduleOptions.publishBuildOptions;
  if (optionsRecord.skipPreflight === true) {
    return downloadSiteZipBundle(editor, buildOptions, { preflight: optionsRecord.preflight || null });
  }
  const preflightRecord = runExportPreflight(editor);
  if (preflightRecord.errorCount > 0) {
    openPublishModal(editor, { buildOptions, moduleOptions, preflight: preflightRecord });
    return false;
  }
  const downloaded = downloadSiteZipBundle(editor, buildOptions, { preflight: preflightRecord });
  if (downloaded && preflightRecord.warningCount > 0) {
    const countText = preflightRecord.warningCount === 1 ? '1 warning' : preflightRecord.warningCount + ' warnings';
    showToastNotice(editor, countText + ' to review under Tools, Export, Check and download', {
      kind: 'warning',
      duration: 6000,
    });
  }
  return downloaded;
};

export default runDownloadSiteCommand;
