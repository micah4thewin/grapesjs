import buildMediaEditorCanvasCss from './buildMediaEditorCanvasCss.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';

const registerMediaEditorCanvasStyles = (editor) =>
  registerEditorOnlyCanvasStyles(editor, 'db-css-media-editor', buildMediaEditorCanvasCss());

export default registerMediaEditorCanvasStyles;
