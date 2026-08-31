const registerComponentTypeSet = (editor, typeDefinitions) =>
  typeDefinitions.forEach(({ type, ...typeDefinition }) => editor.DomComponents.addType(type, typeDefinition));

export default registerComponentTypeSet;
