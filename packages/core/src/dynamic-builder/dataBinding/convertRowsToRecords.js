const convertRowsToRecords = (parsedRows) => {
  const safeRows = Array.isArray(parsedRows) ? parsedRows : [];
  if (!safeRows.length) return [];
  const headerNames = safeRows[0].map((headerText, headerIndex) => {
    const cleanName = String(headerText || '')
      .trim()
      .replace(/[^A-Za-z0-9_-]/g, '');
    return cleanName || `field${headerIndex + 1}`;
  });
  return safeRows.slice(1).map((parsedRow) => {
    const rowRecord = {};
    headerNames.forEach((headerName, headerIndex) => {
      rowRecord[headerName] = parsedRow[headerIndex] === undefined ? '' : String(parsedRow[headerIndex]).trim();
    });
    return rowRecord;
  });
};

export default convertRowsToRecords;
