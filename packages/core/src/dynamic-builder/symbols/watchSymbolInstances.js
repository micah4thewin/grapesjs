import captureSymbolFromInstance from './captureSymbolFromInstance.js';
import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import renderAllSymbolInstances from './renderAllSymbolInstances.js';
import renderSymbolInstance from './renderSymbolInstance.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';

const watchSymbolInstances = (editor) => {
  let syncTimer = null;
  let isSyncing = false;
  const scheduleMasterSync = (instanceComponent) => {
    if (isSyncing) return;
    syncTimer && clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
      isSyncing = true;
      try {
        captureSymbolFromInstance(editor, instanceComponent);
        renderAllSymbolInstances(editor, resolveSymbolIdOfComponent(instanceComponent), instanceComponent);
      } finally {
        isSyncing = false;
      }
    }, 350);
  };
  const handleSubtreeChange = (changedComponent) => {
    if (isSyncing || !changedComponent || typeof changedComponent.get !== 'function') return;
    const instanceComponent = findOwningSymbolInstance(changedComponent);
    if (!instanceComponent || !isSymbolInstanceEditing(instanceComponent)) return;
    scheduleMasterSync(instanceComponent);
  };
  editor.on('component:add', (addedComponent) => {
    if (isSyncing) return;
    if (addedComponent && addedComponent.get && addedComponent.get('type') === 'db-symbol') {
      renderSymbolInstance(editor, addedComponent);
      return;
    }
    handleSubtreeChange(addedComponent);
  });
  editor.on('component:remove', handleSubtreeChange);
  editor.on('component:update', handleSubtreeChange);
  editor.on('component:input', handleSubtreeChange);
  editor.on('component:update:attributes', (changedComponent) => {
    if (isSyncing || !changedComponent || !changedComponent.get) return;
    if (changedComponent.get('type') !== 'db-symbol') {
      handleSubtreeChange(changedComponent);
      return;
    }
    if (changedComponent.get('dbSymbolRenderedId') === resolveSymbolIdOfComponent(changedComponent)) return;
    changedComponent.set('dbSymbolRenderedId', resolveSymbolIdOfComponent(changedComponent), { avoidStore: true });
    renderSymbolInstance(editor, changedComponent);
  });
  editor.on('page:select', () => renderAllSymbolInstances(editor));
  if (editor.onReady) editor.onReady(() => renderAllSymbolInstances(editor));
};

export default watchSymbolInstances;
