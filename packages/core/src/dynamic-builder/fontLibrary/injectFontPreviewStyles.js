import buildGoogleFontImportUrl from '../typography/buildGoogleFontImportUrl.js';
import getFontLibraryRecords from './getFontLibraryRecords.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';

const injectFontPreviewStyles = (editor) => {
  const fontRecords = getFontLibraryRecords();
  const chunkSize = 12;
  for (let chunkIndex = 0; chunkIndex * chunkSize < fontRecords.length; chunkIndex += 1) {
    const chunkRecords = fontRecords.slice(chunkIndex * chunkSize, chunkIndex * chunkSize + chunkSize);
    const importUrl = buildGoogleFontImportUrl(
      chunkRecords.map((fontRecord) => ({ family: fontRecord.family, weights: [400, 700] })),
    );
    if (importUrl) injectEditorStylesOnce(editor, `db-css-font-preview-${chunkIndex}`, `@import url("${importUrl}");`);
  }
};

export default injectFontPreviewStyles;
