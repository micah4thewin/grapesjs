import buildDownloadButtonMarkup from './buildDownloadButtonMarkup.js';
import buildPanelIconButtonMarkup from './buildPanelIconButtonMarkup.js';
import buildSaveStatusMarkup from './buildSaveStatusMarkup.js';
import buildSoundToggleMarkup from './buildSoundToggleMarkup.js';
import buildThemeToggleMarkup from './buildThemeToggleMarkup.js';

const buildStatusGroupMarkup = (experienceOptions) =>
  [
    '<div class="gjs-db-panel-group gjs-db-shell-status-group">',
    buildSoundToggleMarkup(experienceOptions),
    buildThemeToggleMarkup(),
    buildSaveStatusMarkup(),
    buildPanelIconButtonMarkup(
      'Save a snapshot',
      'bookmark',
      'data-db-command="db:save-revision" data-db-snapshot-button',
    ),
    buildDownloadButtonMarkup(),
    '</div>',
  ].join('');

export default buildStatusGroupMarkup;
