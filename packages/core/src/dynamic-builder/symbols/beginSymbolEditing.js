import applySymbolToolbar from './applySymbolToolbar.js';
import setSymbolInstanceEditing from './setSymbolInstanceEditing.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';
import updateSymbolEditTraitText from './updateSymbolEditTraitText.js';

const beginSymbolEditing = (editor, instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.set !== 'function') return;
  setSymbolInstanceEditing(instanceComponent, true);
  instanceComponent.set('droppable', true, { avoidStore: true });
  setSymbolSubtreeLocked(instanceComponent, false);
  applySymbolToolbar(editor, instanceComponent);
  updateSymbolEditTraitText(instanceComponent, true);
  editor.trigger('db:symbol:editing', { component: instanceComponent, editing: true });
};

export default beginSymbolEditing;
