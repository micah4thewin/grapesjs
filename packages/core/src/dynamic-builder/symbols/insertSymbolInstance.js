import renderSymbolInstance from './renderSymbolInstance.js';
import resolveSymbolInsertIndex from './resolveSymbolInsertIndex.js';

const insertSymbolInstance = (editor, symbolId, targetPage, insertOptions = {}) => {
  const activePage = targetPage || (editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected());
  const rootComponent = activePage && activePage.getMainComponent ? activePage.getMainComponent() : null;
  if (!rootComponent) return null;
  const placement = insertOptions.placement || (insertOptions.atTop ? 'top' : 'bottom');
  const insertIndex =
    typeof insertOptions.at === 'number' ? insertOptions.at : resolveSymbolInsertIndex(rootComponent, placement);
  const addedComponents = rootComponent.append(
    { type: 'db-symbol', attributes: { 'data-db-type': 'symbol', 'data-db-symbol': symbolId } },
    { at: insertIndex },
  );
  const instanceComponent = addedComponents && addedComponents[0];
  if (!instanceComponent) return null;
  const isRendered =
    instanceComponent.get('dbSymbolRenderedId') === String(symbolId) && instanceComponent.components().length;
  if (!isRendered) renderSymbolInstance(editor, instanceComponent);
  return instanceComponent;
};

export default insertSymbolInstance;
