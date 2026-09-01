import applyTokenRecordUpdate from './applyTokenRecordUpdate.js';
import buildDesignKitFontImportCss from './buildDesignKitFontImportCss.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';

const applyDesignKitSelection = (editor, moduleOptions, kitRecord) => {
  const fontImportCss = buildDesignKitFontImportCss(kitRecord.fontFamilies);
  if (fontImportCss) registerCanvasStyles(editor, 'db-css-designtokens-fonts', fontImportCss);
  applyTokenRecordUpdate(editor, moduleOptions, kitRecord.tokens);
  editor.trigger('db:design-kit:applied', { kitId: kitRecord.kitId });
};

export default applyDesignKitSelection;
