import buildPanelIconButtonMarkup from './buildPanelIconButtonMarkup.js';

const buildStatusGroupMarkup = () =>
  [
    '<div class="gjs-db-panel-group gjs-db-shell-status-group">',
    '<span class="gjs-db-status" data-db-save-status data-db-state="idle" role="status" aria-live="polite">',
    'Ready</span>',
    buildPanelIconButtonMarkup('Save revision', 'save', 'data-db-command="db:save-revision"'),
    '</div>',
  ].join('');

export default buildStatusGroupMarkup;
