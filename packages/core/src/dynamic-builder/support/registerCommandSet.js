const registerCommandSet = (editor, commandDefinitions) =>
  Object.entries(commandDefinitions).forEach(([commandId, commandHandler]) =>
    editor.Commands.add(commandId, commandHandler),
  );

export default registerCommandSet;
