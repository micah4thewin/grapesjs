import buildAnimationSiteCss from './buildAnimationSiteCss.js';
import getAnimationRuntimeSource from './getAnimationRuntimeSource.js';
import hasScrollAnimations from './hasScrollAnimations.js';
import previewAnimationsOnCanvas from './previewAnimationsOnCanvas.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerRuntimeScript from '../support/registerRuntimeScript.js';
import showToastNotice from '../support/showToastNotice.js';
import watchPreviewAnimationMode from './watchPreviewAnimationMode.js';

const applyScrollAnimations = (editor) => {
  registerCanvasStyles(editor, 'db-css-animations-base', buildAnimationSiteCss());
  registerRuntimeScript(editor, 'db-animations', {
    detect: (runtimeEditor, page) => hasScrollAnimations(runtimeEditor, page),
    source: () => getAnimationRuntimeSource(),
  });
  watchPreviewAnimationMode(editor);
  registerCommandSet(editor, {
    'db:preview-animations': (commandEditor) => {
      const previewCount = previewAnimationsOnCanvas(commandEditor);
      if (!previewCount) showToastNotice(commandEditor, 'Nothing on this page animates yet.', { kind: 'warning' });
    },
  });
};

export default applyScrollAnimations;
