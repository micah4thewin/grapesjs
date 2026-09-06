import buildDesignKitFontImportCss from './buildDesignKitFontImportCss.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const syncDesignKitFontStyles = (editor) => {
  const kitRecord = getSiteMetaRecord(editor).designKit;
  const fontFamilies = isPlainRecord(kitRecord) && Array.isArray(kitRecord.fontFamilies) ? kitRecord.fontFamilies : [];
  const fontImportCss = buildDesignKitFontImportCss(fontFamilies);
  const cssRegistry = editor.getModel().get('dbCanvasCssRegistry');
  if (!fontImportCss && !(cssRegistry && cssRegistry.has('db-css-designtokens-fonts'))) return;
  registerCanvasStyles(editor, 'db-css-designtokens-fonts', fontImportCss);
};

export default syncDesignKitFontStyles;
