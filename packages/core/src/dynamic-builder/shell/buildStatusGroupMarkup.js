import buildDownloadButtonMarkup from './buildDownloadButtonMarkup.js';
import buildPanelIconButtonMarkup from './buildPanelIconButtonMarkup.js';
import buildSoundToggleMarkup from './buildSoundToggleMarkup.js';
import buildThemeToggleMarkup from './buildThemeToggleMarkup.js';

const buildStatusGroupMarkup = () =>
  [
    '<div class="gjs-db-panel-group gjs-db-shell-status-group">',
    buildSoundToggleMarkup(),
    buildThemeToggleMarkup(),
    '<span class="gjs-db-status" data-db-save-status data-db-state="idle" role="status" aria-live="polite">',
    'Ready</span>',
    buildPanelIconButtonMarkup('Save revision', 'save', 'data-db-command="db:save-revision"'),
    buildDownloadButtonMarkup(),
    '</div>',
  ].join('');

export default buildStatusGroupMarkup;
