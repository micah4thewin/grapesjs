import getFontLibraryRecords from './getFontLibraryRecords.js';
import getSiteMetaRecord from '../support/getSiteMetaRecord.js';
import isPlainRecord from '../support/isPlainRecord.js';

const resolveCurrentFontChoices = (editor) => {
  const tokenRecord = getSiteMetaRecord(editor).designTokens;
  const fontTokens = isPlainRecord(tokenRecord) && isPlainRecord(tokenRecord.font) ? tokenRecord.font : {};
  const familyNames = getFontLibraryRecords().map((fontRecord) => fontRecord.family);
  const findFamily = (stackValue) =>
    familyNames.filter((familyName) => String(stackValue || '').indexOf(familyName) >= 0)[0] || '';
  return { display: findFamily(fontTokens.display), body: findFamily(fontTokens.body) };
};

export default resolveCurrentFontChoices;
