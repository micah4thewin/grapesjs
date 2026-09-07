import isPlainRecord from '../support/isPlainRecord.js';

const resolveSymbolRootDefinition = (symbolRecord) => {
  const definitionList = symbolRecord && Array.isArray(symbolRecord.components) ? symbolRecord.components : [];
  return isPlainRecord(definitionList[0]) ? definitionList[0] : null;
};

export default resolveSymbolRootDefinition;
