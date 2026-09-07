import buildCommandShortcutMap from './buildCommandShortcutMap.js';
import collectPaletteBlockActions from './collectPaletteBlockActions.js';
import collectPaletteDeviceActions from './collectPaletteDeviceActions.js';
import collectPalettePageActions from './collectPalettePageActions.js';
import collectPaletteShellActions from './collectPaletteShellActions.js';
import deriveLabelFromCommandId from './deriveLabelFromCommandId.js';
import getCoreCommandLabelRecords from './getCoreCommandLabelRecords.js';
import getDbCommandLabelRecords from './getDbCommandLabelRecords.js';
import getSelectionDependentCommandIds from './getSelectionDependentCommandIds.js';
import resolvePaletteGroupTitle from './resolvePaletteGroupTitle.js';
import runShellCommand from './runShellCommand.js';

const collectPaletteActions = (editor) => {
  const shortcutMap = buildCommandShortcutMap(editor);
  const hasSelection = Boolean(editor.getSelected && editor.getSelected());
  const hiddenCommandIds = hasSelection ? [] : getSelectionDependentCommandIds();
  const dbLabelRecords = getDbCommandLabelRecords();
  const coreLabelRecords = getCoreCommandLabelRecords();
  const buildCommandRecord = (commandId, labelRecord) => ({
    actionId: commandId,
    groupTitle: resolvePaletteGroupTitle(commandId),
    label: labelRecord.label || deriveLabelFromCommandId(commandId),
    iconName: labelRecord.iconName || 'commandPalette',
    keywords: `${labelRecord.keywords || ''} ${commandId}`,
    keysText: shortcutMap[commandId] || '',
    hintText: '',
    runAction: () => runShellCommand(editor, commandId),
  });
  const isListedCommand = (commandId) =>
    commandId !== 'db:open-command-palette' && hiddenCommandIds.indexOf(commandId) < 0;
  const dbRecords = Object.keys(editor.Commands.getAll())
    .filter((commandId) => commandId.indexOf('db:') === 0 && isListedCommand(commandId))
    .map((commandId) => buildCommandRecord(commandId, dbLabelRecords[commandId] || {}));
  const coreRecords = Object.keys(coreLabelRecords)
    .filter((commandId) => editor.Commands.has(commandId) && isListedCommand(commandId))
    .map((commandId) => buildCommandRecord(commandId, coreLabelRecords[commandId]));
  return [
    ...dbRecords,
    ...coreRecords,
    ...collectPaletteShellActions(editor),
    ...collectPaletteDeviceActions(editor),
    ...collectPalettePageActions(editor),
    ...collectPaletteBlockActions(editor),
  ];
};

export default collectPaletteActions;
