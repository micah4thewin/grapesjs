import applyTokenRecordUpdate from '../designTokens/applyTokenRecordUpdate.js';
import buildFontFamilyStack from './buildFontFamilyStack.js';
import getFontLibraryRecords from './getFontLibraryRecords.js';
import syncDesignKitFontStyles from '../designTokens/syncDesignKitFontStyles.js';
import updateSiteMetaRecord from '../support/updateSiteMetaRecord.js';

const applyFontSelection = (editor, designTokenOptions, fontChoices) => {
  const knownFamilies = getFontLibraryRecords().map((fontRecord) => fontRecord.family);
  const chosenFamilies = [fontChoices.display, fontChoices.body].filter(
    (familyName, index, list) =>
      familyName && knownFamilies.indexOf(familyName) >= 0 && list.indexOf(familyName) === index,
  );
  updateSiteMetaRecord(editor, {
    designKit: { kitId: chosenFamilies.length ? 'custom-fonts' : '', fontFamilies: chosenFamilies },
  });
  syncDesignKitFontStyles(editor);
  const fontPatch = {};
  if (fontChoices.display) fontPatch.display = buildFontFamilyStack(fontChoices.display);
  if (fontChoices.body) fontPatch.body = buildFontFamilyStack(fontChoices.body);
  applyTokenRecordUpdate(editor, designTokenOptions, { font: fontPatch });
  editor.trigger('db:fonts:applied', fontChoices);
};

export default applyFontSelection;
