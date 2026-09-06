import isSymbolInstanceEditing from './isSymbolInstanceEditing.js';
import listSymbolInstances from './listSymbolInstances.js';
import renderSymbolInstance from './renderSymbolInstance.js';

const renderAllSymbolInstances = (editor, symbolId, skippedInstance) => {
  listSymbolInstances(editor, symbolId).forEach((instanceComponent) => {
    if (skippedInstance && instanceComponent === skippedInstance) return;
    if (isSymbolInstanceEditing(instanceComponent)) return;
    renderSymbolInstance(editor, instanceComponent);
  });
};

export default renderAllSymbolInstances;
