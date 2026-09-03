import captureSymbolFromInstance from './captureSymbolFromInstance.js';
import renderAllSymbolInstances from './renderAllSymbolInstances.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';

const finishSymbolEditing = (editor, instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.removeAttributes !== 'function') return;
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  captureSymbolFromInstance(editor, instanceComponent);
  instanceComponent.removeAttributes('data-db-symbol-editing');
  instanceComponent.set('droppable', false, { avoidStore: true });
  setSymbolSubtreeLocked(instanceComponent, true);
  renderAllSymbolInstances(editor, symbolId, instanceComponent);
  editor.trigger('db:symbol:editing', { component: instanceComponent, editing: false });
};

export default finishSymbolEditing;
