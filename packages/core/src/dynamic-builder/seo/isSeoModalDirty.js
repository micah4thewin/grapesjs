import collectSeoModalValues from './collectSeoModalValues.js';

const isSeoModalDirty = (rootElement) => {
  const storedSnapshot = rootElement.dataset.dbSeoSnapshot;
  if (!storedSnapshot) return false;
  return JSON.stringify(collectSeoModalValues(rootElement)) !== storedSnapshot;
};

export default isSeoModalDirty;
