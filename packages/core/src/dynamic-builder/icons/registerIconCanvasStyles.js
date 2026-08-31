import registerCanvasStyles from '../support/registerCanvasStyles.js';
import buildIconBaseCss from './buildIconBaseCss.js';

const registerIconCanvasStyles = (editor) => registerCanvasStyles(editor, 'db-css-icons-base', buildIconBaseCss());

export default registerIconCanvasStyles;
