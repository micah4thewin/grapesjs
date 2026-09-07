import isPlainRecord from '../support/isPlainRecord.js';
import resolveDefinitionLeafKind from './resolveDefinitionLeafKind.js';

const collectDefinitionLeafKinds = (definitionList, maxCount, collectedKinds = []) => {
  (Array.isArray(definitionList) ? definitionList : []).forEach((definitionRecord) => {
    if (collectedKinds.length >= maxCount || !isPlainRecord(definitionRecord)) return;
    const leafKind = resolveDefinitionLeafKind(definitionRecord);
    if (leafKind) {
      collectedKinds.push(leafKind);
      return;
    }
    collectDefinitionLeafKinds(definitionRecord.components, maxCount, collectedKinds);
  });
  return collectedKinds;
};

export default collectDefinitionLeafKinds;
