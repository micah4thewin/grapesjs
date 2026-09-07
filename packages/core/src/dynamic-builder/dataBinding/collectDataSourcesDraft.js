const collectDataSourcesDraft = (editorState) => {
  const draftRecord = {};
  editorState.entries.forEach((sourceEntry) => {
    draftRecord[sourceEntry.name] = sourceEntry.value;
  });
  editorState.deletedNames.forEach((deletedName) => {
    if (!(deletedName in draftRecord)) draftRecord[deletedName] = null;
  });
  return draftRecord;
};

export default collectDataSourcesDraft;
