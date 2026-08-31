import registerDevicePresets from './registerDevicePresets.js';
import registerDeviceVisibilityStyles from './registerDeviceVisibilityStyles.js';

const applyResponsiveDevices = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.devices) || {};
  registerDevicePresets(editor, moduleOptions);
  registerDeviceVisibilityStyles(editor);
};

export default applyResponsiveDevices;
