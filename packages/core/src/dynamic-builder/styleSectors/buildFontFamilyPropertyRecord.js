import buildFontFamilyStack from '../fontLibrary/buildFontFamilyStack.js';
import getDesignKitRecords from '../designTokens/getDesignKitRecords.js';
import getFontLibraryRecords from '../fontLibrary/getFontLibraryRecords.js';
import getSecondaryDesignKitRecords from '../designTokens/getSecondaryDesignKitRecords.js';

const buildFontFamilyPropertyRecord = (editor) => {
  const styleManager = editor && editor.StyleManager;
  const builtInRecord = styleManager && styleManager.getBuiltIn ? styleManager.getBuiltIn('font-family') : null;
  const builtInOptions = builtInRecord && Array.isArray(builtInRecord.options) ? builtInRecord.options : [];
  const tokenOptions = [
    { id: '', label: 'Site default (inherited)' },
    { id: 'var(--db-font-display)', label: 'Site heading font' },
    { id: 'var(--db-font-body)', label: 'Site body font' },
    { id: 'var(--db-font-mono)', label: 'Site code font' },
  ];
  const libraryFamilies = getFontLibraryRecords().map((fontRecord) => fontRecord.family);
  const kitFamilies = [];
  [...getDesignKitRecords(), ...getSecondaryDesignKitRecords()].forEach((kitRecord) => {
    (kitRecord.fontFamilies || []).forEach((familyName) => {
      if (libraryFamilies.indexOf(familyName) < 0 && kitFamilies.indexOf(familyName) < 0) kitFamilies.push(familyName);
    });
  });
  const familyOptions = libraryFamilies.concat(kitFamilies).map((familyName) => ({
    id: buildFontFamilyStack(familyName),
    label: familyName,
  }));
  return {
    extend: 'font-family',
    default: '',
    options: tokenOptions.concat(
      familyOptions,
      builtInOptions.map((option) => ({ ...option })),
    ),
  };
};

export default buildFontFamilyPropertyRecord;
