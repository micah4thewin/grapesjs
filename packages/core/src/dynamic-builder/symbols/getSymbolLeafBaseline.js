import getSymbolBaselineStore from './getSymbolBaselineStore.js';
import isPlainRecord from '../support/isPlainRecord.js';

const getSymbolLeafBaseline = (editor, instanceComponent) => {
  const baselineStore = getSymbolBaselineStore(editor);
  const storedBaseline = baselineStore && instanceComponent ? baselineStore.get(instanceComponent) : null;
  return isPlainRecord(storedBaseline) ? storedBaseline : {};
};

export default getSymbolLeafBaseline;
