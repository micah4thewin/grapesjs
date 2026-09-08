import createSymbolMasterSyncScheduler from './createSymbolMasterSyncScheduler.js';
import findOwningSymbolInstance from './findOwningSymbolInstance.js';
import findOwningSymbolLeaf from './findOwningSymbolLeaf.js';
import isEditorOnlyComponentUpdate from './isEditorOnlyComponentUpdate.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import isSymbolRenderBusy from './isSymbolRenderBusy.js';
import recordSymbolLeafOverride from './recordSymbolLeafOverride.js';
import refreshSymbolElementFlags from './refreshSymbolElementFlags.js';
import renderAllSymbolInstances from './renderAllSymbolInstances.js';
import renderSymbolInstance from './renderSymbolInstance.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';

const watchSymbolInstances = (editor) => {
  const syncScheduler = createSymbolMasterSyncScheduler(editor);
  const isBusy = () => syncScheduler.isSyncing() || isSymbolRenderBusy(editor);
  const handleSubtreeChange = (changedComponent) => {
    if (isBusy() || !changedComponent || typeof changedComponent.get !== 'function') return;
    const instanceComponent = findOwningSymbolInstance(changedComponent);
    if (!instanceComponent || instanceComponent === changedComponent) return;
    if (isSymbolInstanceEditing(instanceComponent)) {
      syncScheduler.schedule(instanceComponent);
      return;
    }
    const leafComponent = findOwningSymbolLeaf(changedComponent, instanceComponent);
    leafComponent && recordSymbolLeafOverride(editor, instanceComponent, leafComponent);
  };
  const removalParents = new WeakMap();
  const handleChildRemoval = (removedComponent) => {
    const parentComponent = removedComponent ? removalParents.get(removedComponent) : null;
    removedComponent && removalParents.delete(removedComponent);
    handleSubtreeChange(parentComponent || removedComponent);
  };
  editor.on('component:add', (addedComponent) => {
    if (addedComponent && addedComponent.get && addedComponent.get('type') === 'db-symbol') {
      renderSymbolInstance(editor, addedComponent);
      return;
    }
    handleSubtreeChange(addedComponent);
  });
  editor.on('component:remove:before', (removedComponent) => {
    const parentComponent = removedComponent && removedComponent.parent ? removedComponent.parent() : null;
    parentComponent && removalParents.set(removedComponent, parentComponent);
  });
  editor.on('component:remove', handleChildRemoval);
  editor.on('component:update', (changedComponent) => {
    if (!isEditorOnlyComponentUpdate(changedComponent)) handleSubtreeChange(changedComponent);
  });
  editor.on('component:input', handleSubtreeChange);
  // Style manager edits land on CSS rules rather than the component, so they
  // never raise component:update; follow them through the selected component.
  editor.on('style:property:update component:styleUpdate', () => handleSubtreeChange(editor.getSelected()));
  editor.on('component:update:attributes', (changedComponent) => {
    if (isBusy() || !changedComponent || !changedComponent.get) return;
    refreshSymbolElementFlags(changedComponent);
    if (changedComponent.get('type') !== 'db-symbol') return;
    if (changedComponent.get('dbSymbolRenderedId') === resolveSymbolIdOfComponent(changedComponent)) return;
    changedComponent.set('dbSymbolRenderedId', resolveSymbolIdOfComponent(changedComponent), { avoidStore: true });
    renderSymbolInstance(editor, changedComponent);
  });
  editor.on('component:mount', refreshSymbolElementFlags);
  editor.on('db:symbol:editing', (editingPayload) => {
    if (editingPayload && editingPayload.editing === false) syncScheduler.cancel();
  });
  editor.on('page:select', () => renderAllSymbolInstances(editor));
  if (editor.onReady) editor.onReady(() => renderAllSymbolInstances(editor));
};

export default watchSymbolInstances;
