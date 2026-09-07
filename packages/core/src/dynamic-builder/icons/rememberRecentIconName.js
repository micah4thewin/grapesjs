import readRecentIconNames from './readRecentIconNames.js';

const rememberRecentIconName = (iconName) => {
  if (!iconName) return;
  const nextNames = [iconName, ...readRecentIconNames().filter((knownName) => knownName !== iconName)].slice(0, 12);
  try {
    window.localStorage.setItem('db-icon-picker-recent', JSON.stringify(nextNames));
  } catch (storageError) {
    return;
  }
};

export default rememberRecentIconName;
