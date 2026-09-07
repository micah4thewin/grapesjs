const hasShellCommand = (editor, commandId) => {
  const commandManager = editor && editor.Commands;
  if (!commandManager || !commandManager.has) return true;
  return Boolean(commandManager.has(commandId));
};

export default hasShellCommand;
