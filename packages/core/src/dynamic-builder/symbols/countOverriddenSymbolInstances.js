import getSymbolOverrides from './getSymbolOverrides.js';
import listSymbolInstances from './listSymbolInstances.js';

const countOverriddenSymbolInstances = (editor, symbolId) =>
  listSymbolInstances(editor, symbolId).filter(
    (instanceComponent) => Object.keys(getSymbolOverrides(instanceComponent)).length > 0,
  ).length;

export default countOverriddenSymbolInstances;
