import activateViewsPanelButton from './activateViewsPanelButton.js';
import getViewsPanelButtonIds from './getViewsPanelButtonIds.js';

const runShellCommand = (editor, commandId) => {
  if (!commandId) return;
  const viewSwitchCommandIds = Object.keys(getViewsPanelButtonIds());
  if (viewSwitchCommandIds.indexOf(commandId) >= 0 && activateViewsPanelButton(editor, commandId)) return;
  const commandsModule = editor.Commands;
  if (!commandsModule.has(commandId)) return;
  if (commandsModule.isActive(commandId)) commandsModule.stop(commandId);
  else commandsModule.run(commandId);
};

export default runShellCommand;
