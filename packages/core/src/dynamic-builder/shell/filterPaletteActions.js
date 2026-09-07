import parsePaletteQuery from './parsePaletteQuery.js';
import scorePaletteMatch from './scorePaletteMatch.js';

const filterPaletteActions = (actionRecords, queryText) => {
  const parsedQuery = parsePaletteQuery(queryText);
  const scopedRecords = parsedQuery.groupTitle
    ? actionRecords.filter((actionRecord) => actionRecord.groupTitle === parsedQuery.groupTitle)
    : actionRecords.filter((actionRecord) => !actionRecord.prefixOnly);
  const queryParts = parsedQuery.searchText.toLowerCase().split(/\s+/).filter(Boolean);
  if (!queryParts.length) return scopedRecords;
  return scopedRecords
    .map((actionRecord, recordIndex) => {
      const labelText = String(actionRecord.label || '');
      const searchableText = `${labelText} ${actionRecord.keywords || ''}`;
      let totalScore = 0;
      const matchesEveryPart = queryParts.every((queryPart) => {
        const partScore = Math.max(
          scorePaletteMatch(labelText, queryPart) * 2,
          scorePaletteMatch(searchableText, queryPart),
        );
        totalScore += partScore;
        return partScore > 0;
      });
      return { actionRecord, recordIndex, totalScore: matchesEveryPart ? totalScore : 0 };
    })
    .filter((scoredRecord) => scoredRecord.totalScore > 0)
    .sort(
      (leftRecord, rightRecord) =>
        rightRecord.totalScore - leftRecord.totalScore || leftRecord.recordIndex - rightRecord.recordIndex,
    )
    .map((scoredRecord) => scoredRecord.actionRecord);
};

export default filterPaletteActions;
