import buildCustomFontFaceCss from './buildCustomFontFaceCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import isEditorLive from '../support/isEditorLive.js';
import readCustomFontRecords from './readCustomFontRecords.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const customFontStyleId = 'db-css-custom-fonts';

const registerCustomFontFaces = (editor) => {
  if (!isEditorLive(editor)) return '';
  const fontFaceCss = buildCustomFontFaceCss(readCustomFontRecords());
  const cssRegistry = editor.getModel().get('dbCanvasCssRegistry');
  const wasRegistered = Boolean(cssRegistry && cssRegistry.has(customFontStyleId));
  if (!fontFaceCss && !wasRegistered) return '';
  registerCanvasStyles(editor, customFontStyleId, fontFaceCss);
  injectEditorStylesOnce(editor, customFontStyleId + '-editor', fontFaceCss);
  return fontFaceCss;
};

export default registerCustomFontFaces;
