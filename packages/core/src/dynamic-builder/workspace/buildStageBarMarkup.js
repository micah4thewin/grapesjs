import buildDeviceIconMarkup from '../shell/buildDeviceIconMarkup.js';
import describeDeviceLabelText from '../shell/describeDeviceLabelText.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildStageBarMarkup = (editor) => {
  const deviceButtonsMarkup = editor.Devices.getDevices()
    .map((deviceModel) => {
      const deviceId = escapeHtmlText(String(deviceModel.get('id')));
      const labelText = escapeHtmlText(describeDeviceLabelText(deviceModel));
      return [
        `<button type="button" class="gjs-db-stage-button" data-db-stage-device="${deviceId}"`,
        ` aria-pressed="false" title="${labelText}" aria-label="${labelText}">`,
        buildDeviceIconMarkup(String(deviceModel.get('id')), 15),
        '</button>',
      ].join('');
    })
    .join('');
  return [
    '<div class="gjs-db-stage-bar" data-db-stage-bar role="toolbar" aria-label="Canvas controls">',
    `<div class="gjs-db-stage-cluster" data-db-device-seg>${deviceButtonsMarkup}</div>`,
    '<button type="button" class="gjs-db-stage-readout" data-db-stage-width',
    ' title="Preview at a width of your choice"></button>',
    '<div class="gjs-db-stage-cluster">',
    '<button type="button" class="gjs-db-stage-button" data-db-zoom-step="-10" aria-label="Zoom out">',
    getIconMarkup('minus', { size: 14 }),
    '</button>',
    '<button type="button" class="gjs-db-stage-button gjs-db-stage-zoom" data-db-zoom-reset',
    ' title="Reset zoom to 100 per cent">100%</button>',
    '<button type="button" class="gjs-db-stage-button" data-db-zoom-step="10" aria-label="Zoom in">',
    getIconMarkup('plus', { size: 14 }),
    '</button>',
    '</div>',
    '<div class="gjs-db-stage-cluster">',
    '<button type="button" class="gjs-db-stage-button" data-db-inspector-toggle aria-pressed="false">',
    getIconMarkup('styles', { size: 15 }),
    '<span>Design</span></button>',
    '<button type="button" class="gjs-db-stage-button" data-db-stage-preview aria-pressed="false">',
    getIconMarkup('preview', { size: 15 }),
    '<span>Preview</span></button>',
    '</div>',
    '</div>',
  ].join('');
};

export default buildStageBarMarkup;
