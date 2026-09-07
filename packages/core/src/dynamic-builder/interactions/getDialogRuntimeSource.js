import buildDialogIconMarkupRecord from './buildDialogIconMarkupRecord.js';
import getDialogFallbackSource from './getDialogFallbackSource.js';
import getDialogLoaderSource from './getDialogLoaderSource.js';

const getDialogRuntimeSource = (dialogSettings) => {
  const settingsJson = JSON.stringify({
    scriptUrl: String(dialogSettings.scriptUrl || ''),
    styleUrl: String(dialogSettings.styleUrl || ''),
    integrity: String(dialogSettings.integrity || ''),
    enabled: dialogSettings.enabled === true,
  });
  return [
    'var dialogSettings = ' + settingsJson + ';',
    'var dialogIcons = ' + JSON.stringify(buildDialogIconMarkupRecord()) + ';',
    ...getDialogLoaderSource(),
    ...getDialogFallbackSource(),
    'window.dbShowDialog = function (options) {',
    '  return loadSweetAlert().then(function (swal) {',
    '    if (!swal) return buildFallbackDialog(options || {});',
    '    return swal.fire(options || {});',
    '  });',
    '};',
  ].join('\n');
};

export default getDialogRuntimeSource;
