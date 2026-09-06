import buildSymbolPlaceholderMarkup from './buildSymbolPlaceholderMarkup.js';
import getSymbolRecord from './getSymbolRecord.js';
import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import isSymbolNestedInItself from './isSymbolNestedInItself.js';
import resolveSymbolIdOfComponent from './resolveSymbolIdOfComponent.js';
import setSymbolSubtreeLocked from './setSymbolSubtreeLocked.js';

const renderPlaceholder = (instanceComponent, messageText) => {
  instanceComponent.components(buildSymbolPlaceholderMarkup(messageText));
  setSymbolSubtreeLocked(instanceComponent, true);
};

const renderSymbolInstance = (editor, instanceComponent) => {
  if (!instanceComponent || typeof instanceComponent.components !== 'function') return;
  const symbolId = resolveSymbolIdOfComponent(instanceComponent);
  const symbolRecord = symbolId ? getSymbolRecord(editor, symbolId) : null;
  if (!symbolRecord) {
    renderPlaceholder(instanceComponent, 'Pick a reusable component in the settings panel.');
    return;
  }
  if (isSymbolNestedInItself(instanceComponent)) {
    renderPlaceholder(instanceComponent, 'A reusable component cannot contain itself.');
    return;
  }
  const definitionComponents = Array.isArray(symbolRecord.components) ? symbolRecord.components : [];
  instanceComponent.set('name', 'Reusable: ' + String(symbolRecord.name || 'Component'), { avoidStore: true });
  if (!definitionComponents.length) {
    instanceComponent.components(buildSymbolPlaceholderMarkup('This reusable component is empty.'));
  } else {
    instanceComponent.components(JSON.parse(JSON.stringify(definitionComponents)));
  }
  setSymbolSubtreeLocked(instanceComponent, !isSymbolInstanceEditing(instanceComponent));
};

export default renderSymbolInstance;
