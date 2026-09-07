const readRecentPaletteActionIds = () => {
  try {
    const storedText = window.localStorage && window.localStorage.getItem('db-palette-recent-actions');
    const parsedList = storedText ? JSON.parse(storedText) : [];
    if (!Array.isArray(parsedList)) return [];
    return parsedList.filter((actionId) => typeof actionId === 'string').slice(0, 8);
  } catch (storageError) {
    return [];
  }
};

export default readRecentPaletteActionIds;
