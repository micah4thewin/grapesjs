import buildDesignKitFontImportCss from './buildDesignKitFontImportCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';

const injectDesignKitPreviewFonts = (editor, kitRecords) => {
  const fontFamilies = [];
  (kitRecords || []).forEach((kitRecord) => {
    (kitRecord.fontFamilies || []).forEach((familyName) => {
      if (fontFamilies.indexOf(familyName) < 0) fontFamilies.push(familyName);
    });
  });
  const fontImportCss = buildDesignKitFontImportCss(fontFamilies);
  if (fontImportCss) injectEditorStylesOnce(editor, 'db-css-designkits-preview-fonts', fontImportCss);
};

export default injectDesignKitPreviewFonts;
