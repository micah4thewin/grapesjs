const hasHostProvidedContent = (editor) => {
  const editorConfig = (editor.getConfig && editor.getConfig()) || {};
  const projectData = editorConfig.projectData;
  const hasProjectData = !!projectData && Object.keys(projectData).length > 0;
  const storageModule = editor.Storage;
  const storageConfig = (storageModule && storageModule.getConfig && storageModule.getConfig()) || {};
  const usesRemoteStorage = String(storageConfig.type || '') === 'remote';
  return hasProjectData || usesRemoteStorage;
};

export default hasHostProvidedContent;
