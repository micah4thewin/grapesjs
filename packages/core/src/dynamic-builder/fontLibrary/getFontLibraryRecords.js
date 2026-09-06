import getDisplayFontRecords from './getDisplayFontRecords.js';
import getSansFontRecords from './getSansFontRecords.js';
import getSerifFontRecords from './getSerifFontRecords.js';

const getFontLibraryRecords = () => [...getSansFontRecords(), ...getSerifFontRecords(), ...getDisplayFontRecords()];

export default getFontLibraryRecords;
