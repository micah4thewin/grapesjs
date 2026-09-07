import getSymbolBaselineStore from './getSymbolBaselineStore.js';

const setSymbolLeafBaseline = (editor, instanceComponent, baselineRecord) => {
  const baselineStore = getSymbolBaselineStore(editor);
  if (!baselineStore || !instanceComponent) return;
  baselineStore.set(instanceComponent, { ...(baselineRecord || {}) });
};

export default setSymbolLeafBaseline;
