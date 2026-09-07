import getDisplayFontRecords from './getDisplayFontRecords.js';
import getSansFontRecords from './getSansFontRecords.js';
import getSerifFontRecords from './getSerifFontRecords.js';
import listCustomFontFamilyRecords from '../customAssets/listCustomFontFamilyRecords.js';

const getFontLibraryRecords = () => [
  ...listCustomFontFamilyRecords(),
  ...getSansFontRecords(),
  ...getSerifFontRecords(),
  ...getDisplayFontRecords(),
];

export default getFontLibraryRecords;
