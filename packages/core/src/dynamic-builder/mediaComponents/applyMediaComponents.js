import registerMediaCanvasStyles from './registerMediaCanvasStyles.js';
import registerMediaComponentTypes from './registerMediaComponentTypes.js';
import watchImageAccessibilityUpdates from './watchImageAccessibilityUpdates.js';
import watchImageRadiusUpdates from './watchImageRadiusUpdates.js';
import watchMapAddressUpdates from './watchMapAddressUpdates.js';
import watchVideoFacadeUpdates from './watchVideoFacadeUpdates.js';
import applyAssetUploadOptimization from './applyAssetUploadOptimization.js';

const applyMediaComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.mediaComponents) || {};
  applyAssetUploadOptimization(editor, moduleOptions);
  registerMediaComponentTypes(editor);
  registerMediaCanvasStyles(editor, moduleOptions);
  watchImageAccessibilityUpdates(editor);
  watchImageRadiusUpdates(editor);
  watchVideoFacadeUpdates(editor);
  watchMapAddressUpdates(editor);
};

export default applyMediaComponents;
