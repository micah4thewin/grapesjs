import clampNumericValue from './clampNumericValue.js';
import getIconLibraryNames from './getIconLibraryNames.js';

const getIconDefaultSettings = (moduleOptions = {}) => {
  const libraryNames = getIconLibraryNames();
  const requestedName = String(moduleOptions.defaultIconName || 'star');
  return {
    iconName: libraryNames.indexOf(requestedName) >= 0 ? requestedName : 'star',
    size: clampNumericValue(moduleOptions.defaultSize, 12, 96, 24),
    strokeWidth: clampNumericValue(moduleOptions.defaultStrokeWidth, 1, 3, 1.75),
  };
};

export default getIconDefaultSettings;
