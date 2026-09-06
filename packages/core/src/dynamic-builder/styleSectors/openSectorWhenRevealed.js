const openSectorWhenRevealed = (editor, sectorIds) => {
  const watchedIds = Array.isArray(sectorIds) ? sectorIds : [];
  editor.on('style:sector:update', (sectorModel, changes) => {
    if (!sectorModel || !changes || changes.visible !== true) return;
    const sectorId = sectorModel.getId ? sectorModel.getId() : sectorModel.get && sectorModel.get('id');
    if (watchedIds.indexOf(sectorId) < 0 || sectorModel.get('open')) return;
    sectorModel.set('open', true);
  });
};

export default openSectorWhenRevealed;
