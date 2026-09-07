import isPlainRecord from '../support/isPlainRecord.js';

const getSymbolOverrides = (instanceComponent) => {
  const storedOverrides =
    instanceComponent && instanceComponent.get ? instanceComponent.get('dbSymbolOverrides') : null;
  return isPlainRecord(storedOverrides) ? storedOverrides : {};
};

export default getSymbolOverrides;
