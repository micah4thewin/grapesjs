import buildCustomIconSvgMarkup from './buildCustomIconSvgMarkup.js';
import findCustomIconRecord from './findCustomIconRecord.js';
import getIconMarkup from '../support/getIconMarkup.js';

const buildIconMarkupForName = (iconName, options = {}) => {
  const customRecord = findCustomIconRecord(iconName);
  if (!customRecord) return getIconMarkup(iconName, options);
  const customMarkup = buildCustomIconSvgMarkup(customRecord, options);
  return customMarkup || getIconMarkup('image', options);
};

export default buildIconMarkupForName;
