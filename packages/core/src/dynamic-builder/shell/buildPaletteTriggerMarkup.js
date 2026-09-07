import buildKeyChipsMarkup from './buildKeyChipsMarkup.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import formatKeysText from './formatKeysText.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getShellShortcutDefinitions from './getShellShortcutDefinitions.js';

const buildPaletteTriggerMarkup = () => {
  const paletteDefinition = getShellShortcutDefinitions().find(
    (definitionRecord) => definitionRecord.commandId === 'db:open-command-palette',
  );
  const keysText = paletteDefinition ? formatKeysText(paletteDefinition.keys) : '';
  const titleText = keysText ? `Search actions (${keysText})` : 'Search actions';
  return [
    '<div class="gjs-db-panel-group" role="group" aria-label="Search">',
    '<button type="button" class="gjs-db-panel-button gjs-db-menu-trigger gjs-db-palette-trigger"',
    ` data-db-command="db:open-command-palette" title="${escapeHtmlText(titleText)}"`,
    ' aria-label="Search actions" aria-keyshortcuts="Control+K Meta+K">',
    getIconMarkup('search', { size: 15 }),
    '<span class="gjs-db-palette-trigger-label">Search actions</span>',
    buildKeyChipsMarkup(keysText),
    '</button>',
    '</div>',
  ].join('');
};

export default buildPaletteTriggerMarkup;
