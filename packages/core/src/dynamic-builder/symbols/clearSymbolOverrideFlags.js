import applySymbolElementFlag from './applySymbolElementFlag.js';
import walkComponentTree from '../support/walkComponentTree.js';

const clearSymbolOverrideFlags = (instanceComponent) => {
  const childComponents = instanceComponent && instanceComponent.components ? instanceComponent.components() : null;
  if (!childComponents) return;
  childComponents.forEach((childComponent) =>
    walkComponentTree(childComponent, (currentComponent) =>
      applySymbolElementFlag(currentComponent, 'data-db-symbol-overridden', false),
    ),
  );
};

export default clearSymbolOverrideFlags;
