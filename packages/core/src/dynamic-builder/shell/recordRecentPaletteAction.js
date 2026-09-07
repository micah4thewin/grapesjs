import readRecentPaletteActionIds from './readRecentPaletteActionIds.js';

const recordRecentPaletteAction = (actionId) => {
  if (!actionId) return;
  try {
    const previousIds = readRecentPaletteActionIds().filter((recentId) => recentId !== actionId);
    const nextIds = [actionId, ...previousIds].slice(0, 8);
    window.localStorage && window.localStorage.setItem('db-palette-recent-actions', JSON.stringify(nextIds));
  } catch (storageError) {
    return;
  }
};

export default recordRecentPaletteAction;
