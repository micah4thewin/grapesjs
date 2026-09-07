import buildMenuItemMarkup from './buildMenuItemMarkup.js';
import deriveLabelFromCommandId from './deriveLabelFromCommandId.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildToolsMenuItemMarkup = (commandId, labelRecords) => {
  const labelRecord = labelRecords[commandId] || {};
  const labelText = labelRecord.label || deriveLabelFromCommandId(commandId);
  const attributesText = `data-db-command="${escapeHtmlText(commandId)}"`;
  return buildMenuItemMarkup(labelText, labelRecord.iconName || 'settings', attributesText);
};

export default buildToolsMenuItemMarkup;
