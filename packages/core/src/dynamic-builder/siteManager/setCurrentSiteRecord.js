const setCurrentSiteRecord = (editor, managerOptions, siteRecord) => {
  const editorModel = editor.getModel();
  editorModel.set('dbCurrentSite', siteRecord);
  editorModel.set('dbCurrentSiteId', siteRecord.id);
  editorModel.set('dbStorageKey', siteRecord.storageKey);
  return managerOptions.storageAdapter.writeUser({ ...managerOptions.user, lastSiteId: siteRecord.id });
};

export default setCurrentSiteRecord;
