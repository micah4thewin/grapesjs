const formatByteSizeText = (byteCount) => {
  const safeCount = Math.max(0, Number(byteCount) || 0);
  if (safeCount < 1024) return safeCount + ' B';
  if (safeCount < 1024 * 1024) return Math.round(safeCount / 1024) + ' KB';
  return (Math.round((safeCount / (1024 * 1024)) * 10) / 10).toFixed(1) + ' MB';
};

export default formatByteSizeText;
