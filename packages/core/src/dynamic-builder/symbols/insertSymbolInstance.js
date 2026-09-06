import renderSymbolInstance from './renderSymbolInstance.js';

const insertSymbolInstance = (editor, symbolId, targetPage, insertOptions = {}) => {
  const activePage = targetPage || (editor.Pages && editor.Pages.getSelected && editor.Pages.getSelected());
  const rootComponent = activePage && activePage.getMainComponent ? activePage.getMainComponent() : null;
  if (!rootComponent) return null;
  const appendOptions = insertOptions.atTop ? { at: 0 } : {};
  const addedComponents = rootComponent.append(
    { type: 'db-symbol', attributes: { 'data-db-type': 'symbol', 'data-db-symbol': symbolId } },
    appendOptions,
  );
  const instanceComponent = addedComponents && addedComponents[0];
  if (instanceComponent) renderSymbolInstance(editor, instanceComponent);
  return instanceComponent;
};

export default insertSymbolInstance;
