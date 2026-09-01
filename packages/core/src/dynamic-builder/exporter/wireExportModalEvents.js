import buildAssetFileRecords from './buildAssetFileRecords.js';
import buildPageFileRecords from './buildPageFileRecords.js';
import downloadFileRecordList from './downloadFileRecordList.js';
import readExportBuildOptions from './readExportBuildOptions.js';

const wireExportModalEvents = (editor, rootElement) => {
  rootElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    const actionElement =
      targetElement && targetElement.closest ? targetElement.closest('[data-db-export-action]') : null;
    if (!actionElement) return;
    const actionName = actionElement.getAttribute('data-db-export-action');
    const buildOptions = readExportBuildOptions(editor, rootElement);
    if (actionName === 'page') {
      const targetPageId = actionElement.getAttribute('data-db-export-page') || '';
      downloadFileRecordList(editor, buildPageFileRecords(editor, buildOptions, targetPageId), 'page');
    } else if (actionName === 'all-pages') {
      downloadFileRecordList(editor, buildPageFileRecords(editor, buildOptions), 'pages');
    } else if (actionName === 'asset') {
      const targetAssetId = actionElement.getAttribute('data-db-export-asset') || '';
      downloadFileRecordList(editor, buildAssetFileRecords(editor, buildOptions, targetAssetId), 'asset');
    } else if (actionName === 'download-zip') {
      editor.runCommand('db:download-site', { buildOptions: { ...buildOptions, separateAssets: true } });
    } else if (actionName === 'publish') {
      editor.runCommand('db:publish-site', { buildOptions: { ...buildOptions, separateAssets: true } });
    }
  });
};

export default wireExportModalEvents;
