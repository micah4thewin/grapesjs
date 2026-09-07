import getIconMarkup from '../support/getIconMarkup.js';
import getWorkspaceToolRecords from './getWorkspaceToolRecords.js';

const buildDockMarkup = () => {
  const paneRecords = getWorkspaceToolRecords().filter((toolRecord) => toolRecord.kind === 'pane');
  const paneMarkup = paneRecords
    .map((paneRecord) => `<div class="gjs-db-dock-pane" data-db-dock-pane="${paneRecord.id}"></div>`)
    .join('');
  return [
    '<aside class="gjs-db-ws-dock" data-db-dock aria-label="Tool panel">',
    '<div class="gjs-db-dock-head">',
    '<h2 class="gjs-db-dock-title" data-db-dock-title>Blocks</h2>',
    '<button type="button" class="gjs-db-dock-action" data-db-dock-close aria-label="Close panel">',
    getIconMarkup('close', { size: 15 }),
    '</button>',
    '<p class="gjs-db-dock-hint" data-db-dock-hint></p>',
    '<div class="gjs-db-dock-search" data-db-dock-search></div>',
    '</div>',
    `<div class="gjs-db-dock-body" data-db-dock-body>${paneMarkup}</div>`,
    '</aside>',
  ].join('');
};

export default buildDockMarkup;
