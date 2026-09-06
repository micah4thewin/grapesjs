import splitIconNameWords from './splitIconNameWords.js';

const matchIconSearchQuery = (iconName, aliasText, searchQuery) => {
  const normalizedQuery = String(searchQuery || '')
    .trim()
    .toLowerCase();
  if (!normalizedQuery) return true;
  const haystack = `${splitIconNameWords(iconName)} ${String(aliasText || '').toLowerCase()}`;
  return normalizedQuery.split(/\s+/).every((queryWord) => haystack.indexOf(queryWord) >= 0);
};

export default matchIconSearchQuery;
