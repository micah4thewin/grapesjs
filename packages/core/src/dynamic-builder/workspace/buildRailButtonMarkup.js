import escapeHtmlText from '../support/escapeHtmlText.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildRailButtonMarkup = (toolRecord) => {
  if (toolRecord.kind === 'divider') return '<div class="gjs-db-rail-divider" aria-hidden="true"></div>';
  const labelText = escapeHtmlText(toolRecord.label);
  const isPane = toolRecord.kind === 'pane';
  const stateAttribute = isPane ? ` aria-pressed="false"` : '';
  return [
    `<button type="button" class="gjs-db-rail-button" data-db-tool="${escapeHtmlText(toolRecord.id)}"`,
    ` data-db-tool-kind="${escapeHtmlText(toolRecord.kind)}"`,
    toolRecord.command ? ` data-db-tool-command="${escapeHtmlText(toolRecord.command)}"` : '',
    `${stateAttribute} title="${labelText}" aria-label="${labelText}">`,
    getIconMarkup(toolRecord.iconName, { size: 19 }),
    `<span class="gjs-db-rail-tip">${labelText}</span>`,
    '</button>',
  ].join('');
};

export default buildRailButtonMarkup;
