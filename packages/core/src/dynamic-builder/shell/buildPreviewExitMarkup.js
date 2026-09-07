import getIconMarkup from '../support/getIconMarkup.js';

const buildPreviewExitMarkup = () =>
  [
    '<div class="gjs-db-panel-group gjs-db-preview-exit-group" data-db-preview-only>',
    '<span class="gjs-db-badge gjs-db-preview-badge">Preview</span>',
    '<button type="button" class="gjs-db-button gjs-db-button-primary gjs-db-preview-exit-button"',
    ' data-db-command="core:preview" title="Back to editing (Esc)">',
    getIconMarkup('eyeOff', { size: 15 }),
    '<span>Exit preview</span>',
    '</button>',
    '</div>',
  ].join('');

export default buildPreviewExitMarkup;
