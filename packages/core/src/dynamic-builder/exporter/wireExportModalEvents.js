import buildAssetFileRecords from './buildAssetFileRecords.js';
import buildPageExportRecords from './buildPageExportRecords.js';
import downloadFileRecordList from './downloadFileRecordList.js';
import openExportPreview from './openExportPreview.js';
import openModalCommandAndReturn from './openModalCommandAndReturn.js';
import readExportBuildOptions from './readExportBuildOptions.js';
import runWithBusyButton from './runWithBusyButton.js';

const wireExportModalEvents = (editor, rootElement) => {
  rootElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    const actionElement =
      targetElement && targetElement.closest ? targetElement.closest('[data-db-export-action]') : null;
    if (!actionElement) return;
    const actionName = actionElement.getAttribute('data-db-export-action');
    const buildOptions = readExportBuildOptions(editor, rootElement);
    const busyHandlers = {
      page: () => {
        const targetPageId = actionElement.getAttribute('data-db-export-page') || '';
        const pageRecords = buildPageExportRecords(editor, buildOptions, targetPageId);
        const pageBaseName = pageRecords.length ? pageRecords[0].fileName.replace(/\.html$/i, '') : 'page';
        downloadFileRecordList(editor, pageRecords, 'page', { archiveFileName: pageBaseName + '-page.zip' });
      },
      'all-pages': () =>
        downloadFileRecordList(editor, buildPageExportRecords(editor, buildOptions), 'pages', {
          forceZip: true,
          archiveFileName: 'pages.zip',
        }),
      asset: () => {
        const targetAssetId = actionElement.getAttribute('data-db-export-asset') || '';
        downloadFileRecordList(editor, buildAssetFileRecords(editor, buildOptions, targetAssetId), 'asset');
      },
      'download-zip': () => editor.runCommand('db:download-site', { buildOptions, skipPreflight: true }),
    };
    const directHandlers = {
      publish: () => editor.runCommand('db:publish-site', { buildOptions }),
      preview: () => openExportPreview(editor, buildOptions),
      'custom-code': () =>
        openModalCommandAndReturn(editor, 'db:open-custom-code', () => editor.runCommand('db:open-export')),
    };
    if (busyHandlers[actionName]) runWithBusyButton(actionElement, busyHandlers[actionName]);
    else if (directHandlers[actionName]) directHandlers[actionName]();
  });
};

export default wireExportModalEvents;
