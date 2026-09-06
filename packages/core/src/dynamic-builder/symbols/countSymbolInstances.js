import listSymbolInstances from './listSymbolInstances.js';

const countSymbolInstances = (editor, symbolId) => listSymbolInstances(editor, symbolId).length;

export default countSymbolInstances;
