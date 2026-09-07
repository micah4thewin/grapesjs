import buildToolsMenuItemMarkup from './buildToolsMenuItemMarkup.js';
import buildToolsMenuSectionMarkup from './buildToolsMenuSectionMarkup.js';
import getCoreCommandLabelRecords from './getCoreCommandLabelRecords.js';
import getDbCommandLabelRecords from './getDbCommandLabelRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';
import listAvailableToolsMenuSections from './listAvailableToolsMenuSections.js';

const buildToolsMenuMarkup = (editor) => {
  const labelRecords = { ...getCoreCommandLabelRecords(), ...getDbCommandLabelRecords() };
  const sectionsMarkup = listAvailableToolsMenuSections(editor)
    .map((sectionRecord) => buildToolsMenuSectionMarkup(sectionRecord, labelRecords))
    .join('');
  return [
    '<div class="gjs-db-panel-group gjs-db-menu-host" role="group" aria-label="Tools">',
    '<button type="button" class="gjs-db-panel-button gjs-db-menu-trigger" data-db-menu-trigger="tools"',
    ' aria-haspopup="true" aria-expanded="false" title="Tools">',
    getIconMarkup('settings', { size: 15 }),
    '<span class="gjs-db-menu-trigger-label">Tools</span>',
    getIconMarkup('chevronDown', { size: 12 }),
    '</button>',
    '<div class="gjs-db-menu gjs-db-menu-tools" data-db-menu="tools" role="menu" aria-label="Tools" hidden>',
    buildToolsMenuItemMarkup('db:open-command-palette', labelRecords),
    sectionsMarkup,
    '</div>',
    '</div>',
  ].join('');
};

export default buildToolsMenuMarkup;
