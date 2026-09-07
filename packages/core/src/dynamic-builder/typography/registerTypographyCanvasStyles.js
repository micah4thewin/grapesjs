import buildTypographyBaseCss from './buildTypographyBaseCss.js';
import buildTypographyUtilityCss from './buildTypographyUtilityCss.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const registerTypographyCanvasStyles = (editor) => {
  registerCanvasStyles(editor, 'db-css-typography-base', buildTypographyBaseCss());
  registerCanvasStyles(editor, 'db-css-typography-utilities', buildTypographyUtilityCss());
};

export default registerTypographyCanvasStyles;
