const watchListTraitChanges = (editor, trait, rootComponent, refreshRows) => {
  if (!trait || trait.dbListWatcher || !rootComponent) return;
  trait.dbListWatcher = true;
  let refreshTimer = null;
  const scheduleRefresh = () => {
    if (refreshTimer) return;
    refreshTimer = setTimeout(() => {
      refreshTimer = null;
      refreshRows();
    }, 0);
  };
  const isInsideRoot = (changedComponent) =>
    changedComponent === rootComponent ||
    Boolean(changedComponent && changedComponent.parents && changedComponent.parents().indexOf(rootComponent) >= 0);
  const handleComponentEvent = (changedComponent) => isInsideRoot(changedComponent) && scheduleRefresh();
  const componentEventNames = ['component:update', 'component:add', 'component:remove:before'];
  componentEventNames.forEach((eventName) => editor.on(eventName, handleComponentEvent));
  ['undo', 'redo'].forEach((eventName) => editor.on(eventName, scheduleRefresh));
  const detachWatcher = (removedComponent) => {
    if (removedComponent !== rootComponent) return;
    componentEventNames.forEach((eventName) => editor.off(eventName, handleComponentEvent));
    ['undo', 'redo'].forEach((eventName) => editor.off(eventName, scheduleRefresh));
    editor.off('component:remove', detachWatcher);
    refreshTimer && clearTimeout(refreshTimer);
    trait.dbListWatcher = false;
  };
  editor.on('component:remove', detachWatcher);
};

export default watchListTraitChanges;
