import buildGoogleFontsCss from './buildGoogleFontsCss.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const registerGoogleFontStyles = (editor, moduleOptions) => {
  const fontsCss = buildGoogleFontsCss(moduleOptions);
  if (!fontsCss) return;
  registerCanvasStyles(editor, 'db-css-typography-fonts', fontsCss);
};

export default registerGoogleFontStyles;
