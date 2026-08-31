import registerMediaCanvasStyles from './registerMediaCanvasStyles.js';
import registerMediaComponentTypes from './registerMediaComponentTypes.js';
import watchImageAccessibilityUpdates from './watchImageAccessibilityUpdates.js';
import watchImageRadiusUpdates from './watchImageRadiusUpdates.js';
import watchMapAddressUpdates from './watchMapAddressUpdates.js';
import watchVideoFacadeUpdates from './watchVideoFacadeUpdates.js';

const applyMediaComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.mediaComponents) || {};
  registerMediaComponentTypes(editor);
  registerMediaCanvasStyles(editor, moduleOptions);
  watchImageAccessibilityUpdates(editor);
  watchImageRadiusUpdates(editor);
  watchVideoFacadeUpdates(editor);
  watchMapAddressUpdates(editor);
};

export default applyMediaComponents;
