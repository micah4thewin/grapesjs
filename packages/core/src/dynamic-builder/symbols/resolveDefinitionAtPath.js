import isPlainRecord from '../support/isPlainRecord.js';

const resolveDefinitionAtPath = (definitionList, leafPath) => {
  if (!leafPath) return null;
  let currentList = Array.isArray(definitionList) ? definitionList : null;
  let currentRecord = null;
  String(leafPath)
    .split('.')
    .forEach((indexText) => {
      const candidateRecord = currentList ? currentList[Number(indexText)] : null;
      currentRecord = isPlainRecord(candidateRecord) ? candidateRecord : null;
      currentList = currentRecord && Array.isArray(currentRecord.components) ? currentRecord.components : null;
    });
  return currentRecord;
};

export default resolveDefinitionAtPath;
