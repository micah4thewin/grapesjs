import registerGoogleFontStyles from './registerGoogleFontStyles.js';
import registerRichTextActions from './registerRichTextActions.js';
import registerTypographyCanvasStyles from './registerTypographyCanvasStyles.js';

const applyTypographySystem = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.typography) || {};
  registerTypographyCanvasStyles(editor);
  registerGoogleFontStyles(editor, moduleOptions);
  registerRichTextActions(editor);
};

export default applyTypographySystem;
