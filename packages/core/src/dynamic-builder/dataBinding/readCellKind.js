const readCellKind = (cellValue) => {
  if (cellValue === null || cellValue === undefined) return 'null';
  if (typeof cellValue === 'number') return 'number';
  if (typeof cellValue === 'boolean') return 'boolean';
  if (typeof cellValue === 'object') return 'json';
  return 'string';
};

export default readCellKind;
