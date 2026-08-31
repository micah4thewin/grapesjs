const registerStyleSectorSet = (editor, sectorDefinitions) => {
  const styleManager = editor && editor.StyleManager;
  if (!styleManager || !styleManager.addSector) return;
  (sectorDefinitions || []).forEach((sectorDefinition) => {
    const { id, ...definition } = sectorDefinition;
    styleManager.addSector(id, definition);
  });
};

export default registerStyleSectorSet;
