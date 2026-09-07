import createSvgIconMarkup from '../support/createSvgIconMarkup.js';
import getDeviceIconName from './getDeviceIconName.js';
import getIconMarkup from '../support/getIconMarkup.js';
import getLandscapeDeviceIconPaths from './getLandscapeDeviceIconPaths.js';
import isLandscapeDeviceId from './isLandscapeDeviceId.js';

const buildDeviceIconMarkup = (deviceId, iconSize) => {
  const iconName = getDeviceIconName(deviceId);
  const landscapePaths = getLandscapeDeviceIconPaths();
  const landscapeInner = isLandscapeDeviceId(deviceId) ? landscapePaths[`${iconName}Landscape`] : '';
  if (landscapeInner) return createSvgIconMarkup(landscapeInner, { size: iconSize });
  return getIconMarkup(iconName, { size: iconSize });
};

export default buildDeviceIconMarkup;
