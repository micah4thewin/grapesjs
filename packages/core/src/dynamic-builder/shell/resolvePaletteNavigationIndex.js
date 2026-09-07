const resolvePaletteNavigationIndex = (keyName, activeIndex, recordCount) => {
  if (!recordCount) return -1;
  if (keyName === 'ArrowDown') return (activeIndex + 1) % recordCount;
  if (keyName === 'ArrowUp') return (activeIndex - 1 + recordCount) % recordCount;
  if (keyName === 'Home') return 0;
  if (keyName === 'End') return recordCount - 1;
  return -1;
};

export default resolvePaletteNavigationIndex;
