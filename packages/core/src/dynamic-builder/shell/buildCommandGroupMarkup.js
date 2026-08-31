import buildPanelIconButtonMarkup from './buildPanelIconButtonMarkup.js';
import deriveLabelFromCommandId from './deriveLabelFromCommandId.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const buildCommandGroupMarkup = (commandIdList, labelRecords, groupLabel, includePressedState) => {
  const buttonsMarkup = commandIdList
    .map((commandId) => {
      const labelRecord = labelRecords[commandId] || {};
      const labelText = labelRecord.label || deriveLabelFromCommandId(commandId);
      const pressedText = includePressedState ? ' aria-pressed="false"' : '';
      const attributesText = `data-db-command="${escapeHtmlText(commandId)}"${pressedText}`;
      return buildPanelIconButtonMarkup(labelText, labelRecord.iconName || 'commandPalette', attributesText);
    })
    .join('');
  return `<div class="gjs-db-panel-group" role="group" aria-label="${escapeHtmlText(groupLabel)}">${buttonsMarkup}</div>`;
};

export default buildCommandGroupMarkup;
