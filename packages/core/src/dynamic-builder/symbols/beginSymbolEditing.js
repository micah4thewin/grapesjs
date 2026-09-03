import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';

const beginSymbolEditing = (editor, instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.addAttributes !== 'function') return;
  instanceComponent.addAttributes({ 'data-db-symbol-editing': 'true' });
  instanceComponent.set('droppable', true, { avoidStore: true });
  setSymbolSubtreeLocked(instanceComponent, false);
  editor.trigger('db:symbol:editing', { component: instanceComponent, editing: true });
};

export default beginSymbolEditing;
