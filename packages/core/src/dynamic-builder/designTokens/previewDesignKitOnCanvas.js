import buildDesignKitFontImportCss from './buildDesignKitFontImportCss.js';
import buildDesignTokenRootCss from './buildDesignTokenRootCss.js';
import injectStylesOnce from '../support/injectStylesOnce.js';
import resolveActiveDesignTokens from './resolveActiveDesignTokens.js';
import resolveKitPreviewTokens from './resolveKitPreviewTokens.js';

const previewDesignKitOnCanvas = (editor, moduleOptions, kitRecord) => {
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  if (!canvasDocument || !kitRecord) return;
  const previewTokens = resolveKitPreviewTokens(resolveActiveDesignTokens(editor, moduleOptions), moduleOptions, kitRecord);
  injectStylesOnce(canvasDocument, 'db-css-designkit-preview-fonts', buildDesignKitFontImportCss(kitRecord.fontFamilies));
  injectStylesOnce(canvasDocument, 'db-css-designkit-preview', buildDesignTokenRootCss(previewTokens));
};

export default previewDesignKitOnCanvas;
