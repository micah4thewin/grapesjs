const parseCellTextByKind = (cellText, cellKind) => {
  const safeText = String(cellText == null ? '' : cellText);
  if (cellKind === 'number') {
    const parsedNumber = Number(safeText.trim());
    return safeText.trim() !== '' && Number.isFinite(parsedNumber) ? parsedNumber : safeText;
  }
  if (cellKind === 'boolean') {
    const loweredText = safeText.trim().toLowerCase();
    if (loweredText === 'true' || loweredText === 'yes') return true;
    if (loweredText === 'false' || loweredText === 'no' || loweredText === '') return false;
    return safeText;
  }
  if (cellKind === 'json') {
    try {
      return JSON.parse(safeText);
    } catch {
      return safeText;
    }
  }
  if (cellKind === 'null' && safeText === '') return null;
  return safeText;
};

export default parseCellTextByKind;
