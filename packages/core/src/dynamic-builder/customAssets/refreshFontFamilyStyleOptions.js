import buildFontFamilyPropertyRecord from '../styleSectors/buildFontFamilyPropertyRecord.js';
import isEditorLive from '../support/isEditorLive.js';

const refreshFontFamilyStyleOptions = (editor) => {
  if (!isEditorLive(editor)) return false;
  const styleManager = editor.StyleManager;
  if (!styleManager || typeof styleManager.getProperty !== 'function') return false;
  const fontProperty = styleManager.getProperty('typography', 'font-family');
  if (!fontProperty || typeof fontProperty.set !== 'function') return false;
  fontProperty.set('options', buildFontFamilyPropertyRecord(editor).options);
  return true;
};

export default refreshFontFamilyStyleOptions;
