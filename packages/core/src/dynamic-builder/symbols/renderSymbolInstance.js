import applySymbolOverrides from './applySymbolOverrides.js';
import buildSymbolPlaceholderMarkup from './buildSymbolPlaceholderMarkup.js';
import collectSymbolLeafBaseline from './collectSymbolLeafBaseline.js';
import getSymbolRecord from './getSymbolRecord.js';
import hasSymbolPlaceholderOnly from './hasSymbolPlaceholderOnly.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import isSymbolNestedInItself from './isSymbolNestedInItself.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import resolveSymbolInstanceName from './resolveSymbolInstanceName.js';
import runSilentSymbolRender from './runSilentSymbolRender.js';
import setSymbolLeafBaseline from './setSymbolLeafBaseline.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';

const renderPlaceholder = (editor, instanceComponent, messageText) => {
  instanceComponent.components(buildSymbolPlaceholderMarkup(messageText));
  setSymbolLeafBaseline(editor, instanceComponent, {});
  setSymbolSubtreeLocked(instanceComponent, true);
};

const renderMissingRecord = (editor, instanceComponent) => {
  const hasOwnContent = instanceComponent.components().length > 0 && !hasSymbolPlaceholderOnly(instanceComponent);
  if (hasOwnContent) {
    setSymbolSubtreeLocked(instanceComponent, true);
    return;
  }
  renderPlaceholder(editor, instanceComponent, 'Pick a reusable component in the settings panel.');
};

const renderSymbolInstance = (editor, instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.components !== 'function') return;
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  const symbolRecord = symbolId ? getSymbolRecord(editor, symbolId) : null;
  runSilentSymbolRender(editor, () => {
    instanceComponent.set('dbSymbolRenderedId', symbolId, { avoidStore: true });
    if (!symbolRecord) {
      renderMissingRecord(editor, instanceComponent);
      return;
    }
    if (isSymbolNestedInItself(instanceComponent)) {
      renderPlaceholder(editor, instanceComponent, 'A reusable component cannot contain itself.');
      return;
    }
    const definitionComponents = Array.isArray(symbolRecord.components) ? symbolRecord.components : [];
    instanceComponent.set('name', resolveSymbolInstanceName(symbolRecord), { avoidStore: true });
    if (!definitionComponents.length) {
      renderPlaceholder(editor, instanceComponent, 'This reusable component is empty.');
    } else {
      instanceComponent.components(JSON.parse(JSON.stringify(definitionComponents)));
      setSymbolLeafBaseline(editor, instanceComponent, collectSymbolLeafBaseline(instanceComponent));
      applySymbolOverrides(editor, instanceComponent);
    }
    setSymbolSubtreeLocked(instanceComponent, !isSymbolInstanceEditing(instanceComponent));
  });
};

export default renderSymbolInstance;
