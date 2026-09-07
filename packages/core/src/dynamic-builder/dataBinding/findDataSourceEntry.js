const findDataSourceEntry = (editorState, sourceName) =>
  editorState.entries.find((sourceEntry) => sourceEntry.name === sourceName) || null;

export default findDataSourceEntry;
