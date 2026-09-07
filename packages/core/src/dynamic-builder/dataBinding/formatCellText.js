const formatCellText = (cellValue) => {
  if (cellValue === null || cellValue === undefined) return '';
  if (typeof cellValue === 'object') {
    try {
      return JSON.stringify(cellValue);
    } catch {
      return '';
    }
  }
  return String(cellValue);
};

export default formatCellText;
