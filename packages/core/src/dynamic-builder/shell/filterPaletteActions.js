const filterPaletteActions = (actionRecords, queryText) => {
  const normalizedQuery = String(queryText || '')
    .trim()
    .toLowerCase();
  if (!normalizedQuery) return actionRecords;
  const queryParts = normalizedQuery.split(/\s+/);
  return actionRecords.filter((actionRecord) => {
    const searchableText = `${actionRecord.label} ${actionRecord.keywords}`.toLowerCase();
    return queryParts.every((queryPart) => searchableText.indexOf(queryPart) >= 0);
  });
};

export default filterPaletteActions;
