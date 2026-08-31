import deriveLabelFromCommandId from './deriveLabelFromCommandId.js';
import getCoreCommandLabelRecords from './getCoreCommandLabelRecords.js';
import getDbCommandLabelRecords from './getDbCommandLabelRecords.js';
import getDeviceIconName from './getDeviceIconName.js';
import runShellCommand from './runShellCommand.js';

const collectPaletteActions = (editor) => {
  const actionRecords = [];
  const dbLabelRecords = getDbCommandLabelRecords();
  Object.keys(editor.Commands.getAll())
    .filter((commandId) => commandId.indexOf('db:') === 0 && commandId !== 'db:open-command-palette')
    .forEach((commandId) => {
      const labelRecord = dbLabelRecords[commandId] || {};
      actionRecords.push({
        actionId: commandId,
        label: labelRecord.label || deriveLabelFromCommandId(commandId),
        iconName: labelRecord.iconName || 'commandPalette',
        keywords: `${labelRecord.keywords || ''} ${commandId}`,
        runAction: () => runShellCommand(editor, commandId),
      });
    });
  const coreLabelRecords = getCoreCommandLabelRecords();
  Object.keys(coreLabelRecords)
    .filter((commandId) => editor.Commands.has(commandId))
    .forEach((commandId) => {
      const labelRecord = coreLabelRecords[commandId];
      actionRecords.push({
        actionId: commandId,
        label: labelRecord.label,
        iconName: labelRecord.iconName,
        keywords: `${labelRecord.keywords} ${commandId}`,
        runAction: () => runShellCommand(editor, commandId),
      });
    });
  editor.Devices.getDevices().forEach((deviceModel) => {
    const deviceId = String(deviceModel.get('id'));
    actionRecords.push({
      actionId: `device:${deviceId}`,
      label: `Switch device: ${deviceModel.getName() || deviceId}`,
      iconName: getDeviceIconName(deviceId),
      keywords: `device viewport responsive ${deviceId}`,
      runAction: () => editor.Devices.select(deviceId),
    });
  });
  editor.Pages.getAll().forEach((pageModel) => {
    const pageId = pageModel.getId();
    actionRecords.push({
      actionId: `page:${pageId}`,
      label: `Switch page: ${pageModel.getName() || pageId}`,
      iconName: 'webpage',
      keywords: `page navigate switch open ${pageId}`,
      runAction: () => editor.Pages.select(pageId),
    });
  });
  return actionRecords;
};

export default collectPaletteActions;
