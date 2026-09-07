import getRepeaterAttributeNames from './getRepeaterAttributeNames.js';
import parseWholeNumberValue from './parseWholeNumberValue.js';

const readText = (attributesRecord, attributeName) => {
  const rawValue = attributesRecord ? attributesRecord[attributeName] : '';
  return String(rawValue == null ? '' : rawValue).trim();
};

const resolveRepeaterSettings = (attributesRecord) => {
  const attributeNames = getRepeaterAttributeNames();
  const aliasText = readText(attributesRecord, attributeNames.itemAlias).replace(/[^A-Za-z0-9_]/g, '');
  return {
    sourceName: readText(attributesRecord, attributeNames.sourceName),
    limitValue: parseWholeNumberValue(readText(attributesRecord, attributeNames.limitValue), 0),
    offsetValue: parseWholeNumberValue(readText(attributesRecord, attributeNames.offsetValue), 0),
    sortField: readText(attributesRecord, attributeNames.sortField),
    sortDirection: readText(attributesRecord, attributeNames.sortDirection) === 'desc' ? 'desc' : 'asc',
    filterField: readText(attributesRecord, attributeNames.filterField),
    filterValue: readText(attributesRecord, attributeNames.filterValue),
    itemAlias: aliasText || 'item',
    emptyText: readText(attributesRecord, attributeNames.emptyText),
  };
};

export default resolveRepeaterSettings;
