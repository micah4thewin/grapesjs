import applySymbolOverrides from './applySymbolOverrides.js';
import buildSymbolPlaceholderMarkup from './buildSymbolPlaceholderMarkup.js';
import getSymbolRecord from './getSymbolRecord.js';
import hasSymbolPlaceholderOnly from './hasSymbolPlaceholderOnly.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import isSymbolNestedInItself from './isSymbolNestedInItself.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import resolveSymbolInstanceName from './resolveSymbolInstanceName.js';
import runSilentSymbolRender from './runSilentSymbolRender.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';

const renderPlaceholder = (instanceComponent, messageText) => {
  instanceComponent.components(buildSymbolPlaceholderMarkup(messageText));
  setSymbolSubtreeLocked(instanceComponent, true);
};

const renderMissingRecord = (instanceComponent) => {
  const hasOwnContent = instanceComponent.components().length > 0 && !hasSymbolPlaceholderOnly(instanceComponent);
  if (hasOwnContent) {
    setSymbolSubtreeLocked(instanceComponent, true);
    return;
  }
  renderPlaceholder(instanceComponent, 'Pick a reusable component in the settings panel.');
};

const renderSymbolInstance = (editor, instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.components !== 'function') return;
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  const symbolRecord = symbolId ? getSymbolRecord(editor, symbolId) : null;
  runSilentSymbolRender(editor, () => {
    instanceComponent.set('dbSymbolRenderedId', symbolId, { avoidStore: true });
    if (!symbolRecord) {
      renderMissingRecord(instanceComponent);
      return;
    }
    if (isSymbolNestedInItself(instanceComponent)) {
      renderPlaceholder(instanceComponent, 'A reusable component cannot contain itself.');
      return;
    }
    const definitionComponents = Array.isArray(symbolRecord.components) ? symbolRecord.components : [];
    instanceComponent.set('name', resolveSymbolInstanceName(symbolRecord), { avoidStore: true });
    if (!definitionComponents.length) {
      instanceComponent.components(buildSymbolPlaceholderMarkup('This reusable component is empty.'));
    } else {
      instanceComponent.components(JSON.parse(JSON.stringify(definitionComponents)));
      applySymbolOverrides(editor, instanceComponent);
    }
    setSymbolSubtreeLocked(instanceComponent, !isSymbolInstanceEditing(instanceComponent));
  });
};

export default renderSymbolInstance;
