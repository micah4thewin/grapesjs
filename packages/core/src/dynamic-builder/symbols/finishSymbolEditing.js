import applySymbolToolbar from './applySymbolToolbar.js';
import captureSymbolFromInstance from './captureSymbolFromInstance.js';
import clearSymbolOverrideFlags from './clearSymbolOverrideFlags.js';
import getSymbolOverrides from './getSymbolOverrides.js';
import renderAllSymbolInstances from './renderAllSymbolInstances.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import runSymbolUndoStep from './runSymbolUndoStep.js';
import setSymbolInstanceEditing from './setSymbolInstanceEditing.js';
import setSymbolOverrides from './setSymbolOverrides.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';
import updateSymbolEditTraitText from './updateSymbolEditTraitText.js';

const finishSymbolEditing = (editor, instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.set !== 'function') return;
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  runSymbolUndoStep(editor, () => {
    captureSymbolFromInstance(editor, instanceComponent);
    setSymbolInstanceEditing(instanceComponent, false);
    instanceComponent.set('droppable', false, { avoidStore: true });
    if (Object.keys(getSymbolOverrides(instanceComponent)).length) setSymbolOverrides(instanceComponent, {});
    clearSymbolOverrideFlags(instanceComponent);
    setSymbolSubtreeLocked(instanceComponent, true);
    renderAllSymbolInstances(editor, symbolId, instanceComponent);
  });
  applySymbolToolbar(editor, instanceComponent);
  updateSymbolEditTraitText(instanceComponent, false);
  editor.trigger('db:symbol:editing', { component: instanceComponent, editing: false });
};

export default finishSymbolEditing;
