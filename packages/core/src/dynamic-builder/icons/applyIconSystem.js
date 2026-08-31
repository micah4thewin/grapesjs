import registerIconAssetGuard from './registerIconAssetGuard.js';
import registerIconCanvasStyles from './registerIconCanvasStyles.js';
import registerIconComponentType from './registerIconComponentType.js';
import registerIconUpdateListener from './registerIconUpdateListener.js';

const applyIconSystem = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.icons) || {};
  registerIconComponentType(editor, moduleOptions);
  registerIconUpdateListener(editor);
  registerIconAssetGuard(editor);
  registerIconCanvasStyles(editor);
};

export default applyIconSystem;
