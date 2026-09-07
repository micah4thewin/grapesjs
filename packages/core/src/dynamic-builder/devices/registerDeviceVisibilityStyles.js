import buildDeviceVisibilityCss from './buildDeviceVisibilityCss.js';
import hasDeviceVisibilityUsage from './hasDeviceVisibilityUsage.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const registerDeviceVisibilityStyles = (editor) => {
  const isUsed = hasDeviceVisibilityUsage(editor);
  registerCanvasStyles(editor, 'db-css-devices-visibility', isUsed ? buildDeviceVisibilityCss() : '');
  return isUsed;
};

export default registerDeviceVisibilityStyles;
