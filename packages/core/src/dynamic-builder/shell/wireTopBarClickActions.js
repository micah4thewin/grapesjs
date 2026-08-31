import runShellCommand from './runShellCommand.js';

const wireTopBarClickActions = (editor, stripElement) => {
  stripElement.addEventListener('click', (clickEvent) => {
    const targetElement = clickEvent.target;
    if (!targetElement || !targetElement.closest) return;
    const commandButton = targetElement.closest('[data-db-command]');
    if (commandButton && stripElement.contains(commandButton)) {
      runShellCommand(editor, commandButton.getAttribute('data-db-command'));
      return;
    }
    const deviceButton = targetElement.closest('[data-db-device]');
    if (deviceButton && stripElement.contains(deviceButton)) {
      editor.Devices.select(deviceButton.getAttribute('data-db-device'));
    }
  });
};

export default wireTopBarClickActions;
