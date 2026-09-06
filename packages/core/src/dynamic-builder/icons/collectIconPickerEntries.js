import getIconCategoryRecords from './getIconCategoryRecords.js';
import getIconSearchAliases from './getIconSearchAliases.js';
import matchIconSearchQuery from './matchIconSearchQuery.js';

const collectIconPickerEntries = (activeCategoryId, searchQuery) => {
  const aliasRecords = getIconSearchAliases();
  return getIconCategoryRecords()
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
