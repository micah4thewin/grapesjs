const registerBlockSet = (editor, blockDefinitions) =>
  blockDefinitions.forEach(({ id, ...blockDefinition }) => editor.BlockManager.add(id, blockDefinition));

export default registerBlockSet;
