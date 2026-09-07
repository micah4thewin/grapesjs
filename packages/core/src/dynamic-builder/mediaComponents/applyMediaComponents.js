import applyAssetUploadOptimization from './applyAssetUploadOptimization.js';
import markCanvasBodyEditing from '../support/markCanvasBodyEditing.js';
import registerLightboxRuntime from './registerLightboxRuntime.js';
import registerMediaCanvasStyles from './registerMediaCanvasStyles.js';
import registerMediaCommands from './registerMediaCommands.js';
import registerMediaComponentTypes from './registerMediaComponentTypes.js';
import registerMediaEditorCanvasStyles from './registerMediaEditorCanvasStyles.js';
import syncAllCarouselDots from './syncAllCarouselDots.js';
import watchCarouselSlideUpdates from './watchCarouselSlideUpdates.js';
import watchDecorativeSvgChildren from './watchDecorativeSvgChildren.js';
import watchGalleryCaptionUpdates from './watchGalleryCaptionUpdates.js';
import watchImageAccessibilityUpdates from './watchImageAccessibilityUpdates.js';
import watchImageRadiusUpdates from './watchImageRadiusUpdates.js';
import watchMapAddressUpdates from './watchMapAddressUpdates.js';
import watchMediaLinkPastes from './watchMediaLinkPastes.js';
import watchVideoFacadeUpdates from './watchVideoFacadeUpdates.js';

const applyMediaComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.mediaComponents) || {};
  applyAssetUploadOptimization(editor, moduleOptions);
  registerMediaComponentTypes(editor);
  registerMediaCommands(editor);
  registerMediaCanvasStyles(editor, moduleOptions);
  registerMediaEditorCanvasStyles(editor);
  registerLightboxRuntime(editor);
  markCanvasBodyEditing(editor);
  watchDecorativeSvgChildren(editor);
  watchImageAccessibilityUpdates(editor);
  watchImageRadiusUpdates(editor);
  watchGalleryCaptionUpdates(editor);
  watchCarouselSlideUpdates(editor);
  watchVideoFacadeUpdates(editor);
  watchMapAddressUpdates(editor);
  watchMediaLinkPastes(editor);
  editor.on('load', () => syncAllCarouselDots(editor));
};

export default applyMediaComponents;
