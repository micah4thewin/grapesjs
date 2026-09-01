import buildMenuItemMarkup from './buildMenuItemMarkup.js';
import deriveLabelFromCommandId from './deriveLabelFromCommandId.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getCoreCommandLabelRecords from './getCoreCommandLabelRecords.js';
import getDbCommandLabelRecords from './getDbCommandLabelRecords.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getToolsMenuCommandIds from './getToolsMenuCommandIds.js';

const buildToolsMenuMarkup = () => {
  const labelRecords = { ...getCoreCommandLabelRecords(), ...getDbCommandLabelRecords() };
  const menuItemsMarkup = getToolsMenuCommandIds()
    .map((commandId) => {
      const labelRecord = labelRecords[commandId] || {};
      const labelText = labelRecord.label || deriveLabelFromCommandId(commandId);
      const attributesText = `data-db-command="${escapeHtmlText(commandId)}"`;
      return buildMenuItemMarkup(labelText, labelRecord.iconName || 'settings', attributesText);
    })
    .join('');
  return [
    '<div class="gjs-db-panel-group gjs-db-menu-host" role="group" aria-label="Tools">',
    '<button type="button" class="gjs-db-panel-button gjs-db-menu-trigger" data-db-menu-trigger="tools"',
    ' aria-haspopup="true" aria-expanded="false" title="Tools">',
    getIconMarkup('settings', { size: 15 }),
    '<span class="gjs-db-menu-trigger-label">Tools</span>',
    getIconMarkup('chevronDown', { size: 12 }),
    '</button>',
    '<div class="gjs-db-menu" data-db-menu="tools" role="menu" aria-label="Tools" hidden>',
    menuItemsMarkup,
    '</div>',
    '</div>',
  ].join('');
};

export default buildToolsMenuMarkup;
