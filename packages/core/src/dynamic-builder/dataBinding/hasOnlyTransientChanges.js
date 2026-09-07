const transientKeys = ['status', 'open', '__p', '_undo', '_undoexc', 'dbSymbolRenderedId'];

const hasOnlyTransientChanges = (changedComponent) => {
  if (!changedComponent || typeof changedComponent.changedAttributes !== 'function') return false;
  const changedRecord = changedComponent.changedAttributes();
  if (!changedRecord) return true;
  const changedKeys = Object.keys(changedRecord);
  return changedKeys.length > 0 && changedKeys.every((changedKey) => transientKeys.indexOf(changedKey) >= 0);
};

export default hasOnlyTransientChanges;
