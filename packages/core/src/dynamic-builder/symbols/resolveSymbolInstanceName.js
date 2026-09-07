const resolveSymbolInstanceName = (symbolRecord) =>
  'Reusable: ' + String((symbolRecord && symbolRecord.name) || 'Component');

export default resolveSymbolInstanceName;
