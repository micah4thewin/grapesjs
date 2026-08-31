const runShellCommand = (editor, commandId) => {
  if (!commandId) return;
  const commandsModule = editor.Commands;
  if (!commandsModule.has(commandId)) return;
  if (commandsModule.isActive(commandId)) commandsModule.stop(commandId);
  else commandsModule.run(commandId);
};

export default runShellCommand;
