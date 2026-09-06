import getFontLibraryRecords from './getFontLibraryRecords.js';

const buildFontFamilyStack = (familyName) => {
  const fontRecord = getFontLibraryRecords().filter((record) => record.family === familyName)[0];
  const fallbackStack = {
    serif: 'Georgia, "Times New Roman", serif',
    display: 'Impact, "Arial Narrow Bold", sans-serif',
    handwriting: '"Segoe Script", "Brush Script MT", cursive',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
  };
  const fallback = fontRecord
    ? fallbackStack[fontRecord.category] || 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif'
    : 'sans-serif';
  return `"${familyName}", ${fallback}`;
};

export default buildFontFamilyStack;
