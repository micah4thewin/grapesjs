const removeDefaultStyleSectors = (editor) => {
  const styleManager = editor && editor.StyleManager;
  if (!styleManager) return;
  const managerConfig = styleManager.getConfig && styleManager.getConfig();
  if (managerConfig) managerConfig.sectors = [];
  const currentSectors = styleManager.getSectors && styleManager.getSectors();
  if (currentSectors && currentSectors.reset) currentSectors.reset();
};

export default removeDefaultStyleSectors;
