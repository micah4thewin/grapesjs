import buildPanelIconButtonMarkup from './buildPanelIconButtonMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildTopBarButtonMarkup = (buttonRecord) => {
  const commandId = String(buttonRecord.commandId || '');
  const labelText = String(buttonRecord.label || commandId);
  const attributesText = `data-db-command="${escapeHtmlText(commandId)}" data-db-extra-button="${escapeHtmlText(commandId)}"`;
  if (!buttonRecord.showLabel)
    return buildPanelIconButtonMarkup(labelText, buttonRecord.iconName || 'folder', attributesText);
  return [
    `<button type="button" class="gjs-db-panel-button gjs-db-menu-trigger" ${attributesText}`,
    ` aria-label="${escapeHtmlText(labelText)}" title="${escapeHtmlText(labelText)}">`,
    getIconMarkup(buttonRecord.iconName || 'folder', { size: 15 }),
    `<span class="gjs-db-menu-trigger-label">${escapeHtmlText(labelText)}</span>`,
    '</button>',
  ].join('');
};

export default buildTopBarButtonMarkup;
