import getIconCategoryRecords from './getIconCategoryRecords.js';
import getIconLibraryNames from './getIconLibraryNames.js';
import getIconSearchAliases from './getIconSearchAliases.js';
import matchIconSearchQuery from './matchIconSearchQuery.js';
import readRecentIconNames from './readRecentIconNames.js';

const collectIconPickerEntries = (activeCategoryId, searchQuery) => {
  const aliasRecords = getIconSearchAliases();
  const libraryNames = getIconLibraryNames();
  const recentNames = readRecentIconNames().filter((iconName) => libraryNames.indexOf(iconName) >= 0);
  const categoryRecords =
    activeCategoryId === 'all' && recentNames.length
      ? [{ categoryId: 'recent', categoryLabel: 'Recently used', iconNames: recentNames }, ...getIconCategoryRecords()]
      : getIconCategoryRecords();
  return categoryRecords
    .filter((categoryRecord) => activeCategoryId === 'all' || categoryRecord.categoryId === activeCategoryId)
    .map((categoryRecord) => ({
      categoryLabel: categoryRecord.categoryLabel,
      iconNames: categoryRecord.iconNames.filter((iconName) =>
        matchIconSearchQuery(iconName, aliasRecords[iconName], searchQuery),
      ),
    }))
    .filter((categoryRecord) => categoryRecord.iconNames.length > 0);
};

export default collectIconPickerEntries;
