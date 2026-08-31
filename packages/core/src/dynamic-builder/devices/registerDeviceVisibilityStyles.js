import registerCanvasStyles from '../support/registerCanvasStyles.js';
import buildDeviceVisibilityCss from './buildDeviceVisibilityCss.js';

const registerDeviceVisibilityStyles = (editor) =>
  registerCanvasStyles(editor, 'db-css-devices-visibility', buildDeviceVisibilityCss());

export default registerDeviceVisibilityStyles;
