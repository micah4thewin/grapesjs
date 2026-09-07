import listChangedSymbolIds from './listChangedSymbolIds.js';
import renderAllSymbolInstances from './renderAllSymbolInstances.js';

const renderChangedSymbolInstances = (editor, previousLibrary, nextLibrary) =>
  listChangedSymbolIds(previousLibrary, nextLibrary).forEach((symbolId) => renderAllSymbolInstances(editor, symbolId));

export default renderChangedSymbolInstances;
