import buildFontCardMarkup from './buildFontCardMarkup.js';
import getFontLibraryRecords from './getFontLibraryRecords.js';

const buildFontListMarkup = (roleName, activeFamily, categoryId, searchQuery) => {
  const query = String(searchQuery || '')
    .trim()
    .toLowerCase();
  const cards = getFontLibraryRecords()
    .filter((fontRecord) => categoryId === 'all' || fontRecord.category === categoryId)
    .filter((fontRecord) => !query || fontRecord.family.toLowerCase().indexOf(query) >= 0)
    .map((fontRecord) => buildFontCardMarkup(fontRecord, roleName, fontRecord.family === activeFamily))
    .join('');
  return cards || '<p class="gjs-db-muted">No fonts match. Try another word or category.</p>';
};

export default buildFontListMarkup;
