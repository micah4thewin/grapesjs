import buildTypographyBaseCss from './buildTypographyBaseCss.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const registerTypographyCanvasStyles = (editor) => {
  registerCanvasStyles(editor, 'db-css-typography-base', buildTypographyBaseCss());
};

export default registerTypographyCanvasStyles;
