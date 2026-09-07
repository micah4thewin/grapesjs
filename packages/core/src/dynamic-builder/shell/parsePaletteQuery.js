const parsePaletteQuery = (queryText) => {
  const trimmedText = String(queryText || '').trim();
  const prefixGroups = { '>': 'Pages', '@': 'Devices', '#': 'Blocks' };
  const groupTitle = prefixGroups[trimmedText.charAt(0)] || '';
  const searchText = groupTitle ? trimmedText.slice(1).trim() : trimmedText;
  return { groupTitle, searchText };
};

export default parsePaletteQuery;
