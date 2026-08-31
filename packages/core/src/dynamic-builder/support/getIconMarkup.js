import createSvgIconMarkup from './createSvgIconMarkup.js';
import getIconPathLibrary from './getIconPathLibrary.js';

const getIconMarkup = (iconName, options = {}) => {
  const iconPathLibrary = getIconPathLibrary();
  const innerMarkup = iconPathLibrary[iconName] || iconPathLibrary.blocks;
  return createSvgIconMarkup(innerMarkup, options);
};

export default getIconMarkup;
