import buildRailButtonMarkup from './buildRailButtonMarkup.js';
import getWorkspaceToolRecords from './getWorkspaceToolRecords.js';

const buildRailMarkup = () =>
  [
    '<nav class="gjs-db-ws-rail" data-db-rail aria-label="Editor tools">',
    getWorkspaceToolRecords().map(buildRailButtonMarkup).join(''),
    '</nav>',
  ].join('');

export default buildRailMarkup;
