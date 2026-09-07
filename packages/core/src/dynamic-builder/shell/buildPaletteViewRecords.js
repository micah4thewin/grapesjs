import filterPaletteActions from './filterPaletteActions.js';
import getPaletteGroupOrder from './getPaletteGroupOrder.js';
import parsePaletteQuery from './parsePaletteQuery.js';

const buildPaletteViewRecords = (actionRecords, queryText, recentActionIds) => {
  const parsedQuery = parsePaletteQuery(queryText);
  if (parsedQuery.searchText || parsedQuery.groupTitle) {
    return {
      records: filterPaletteActions(actionRecords, queryText),
      showGroupHeadings: Boolean(parsedQuery.groupTitle),
    };
  }
  const recentRecords = (recentActionIds || [])
    .map((recentId) => actionRecords.find((actionRecord) => actionRecord.actionId === recentId))
    .filter(Boolean)
    .map((actionRecord) => ({ ...actionRecord, groupTitle: 'Recent' }));
  const recentIds = recentRecords.map((actionRecord) => actionRecord.actionId);
  const groupOrder = getPaletteGroupOrder();
  const resolveGroupRank = (groupTitle) => {
    const groupIndex = groupOrder.indexOf(groupTitle);
    return groupIndex < 0 ? groupOrder.length : groupIndex;
  };
  const remainingRecords = actionRecords
    .filter((actionRecord) => !actionRecord.prefixOnly && recentIds.indexOf(actionRecord.actionId) < 0)
    .map((actionRecord, recordIndex) => ({ actionRecord, recordIndex }))
    .sort(
      (leftEntry, rightEntry) =>
        resolveGroupRank(leftEntry.actionRecord.groupTitle) - resolveGroupRank(rightEntry.actionRecord.groupTitle) ||
        leftEntry.recordIndex - rightEntry.recordIndex,
    )
    .map((sortedEntry) => sortedEntry.actionRecord);
  return { records: [...recentRecords, ...remainingRecords], showGroupHeadings: true };
};

export default buildPaletteViewRecords;
