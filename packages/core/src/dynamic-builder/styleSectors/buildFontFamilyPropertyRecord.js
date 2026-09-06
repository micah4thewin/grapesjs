import buildFontFamilyStack from '../fontLibrary/buildFontFamilyStack.js';
import getFontLibraryRecords from '../fontLibrary/getFontLibraryRecords.js';

const buildFontFamilyPropertyRecord = (editor) => {
  const styleManager = editor && editor.StyleManager;
  const builtInRecord = styleManager && styleManager.getBuiltIn ? styleManager.getBuiltIn('font-family') : null;
  const builtInOptions = builtInRecord && Array.isArray(builtInRecord.options) ? builtInRecord.options : [];
  const tokenOptions = [
    { id: 'var(--db-font-display)', label: 'Site heading font' },
    { id: 'var(--db-font-body)', label: 'Site body font' },
    { id: 'var(--db-font-mono)', label: 'Site code font' },
  ];
  const libraryOptions = getFontLibraryRecords().map((fontRecord) => ({
    id: buildFontFamilyStack(fontRecord.family),
    label: fontRecord.family,
  }));
  return {
    extend: 'font-family',
    options: tokenOptions.concat(
      libraryOptions,
      builtInOptions.map((option) => ({ ...option })),
    ),
  };
};

export default buildFontFamilyPropertyRecord;
