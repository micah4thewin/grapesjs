import getBlockCategoryOverrides from './getBlockCategoryOverrides.js';
import getBlockCategoryRecords from './getBlockCategoryRecords.js';
import getLegacyCategoryMap from './getLegacyCategoryMap.js';

const resolveBlockCategoryRecord = (blockId, categoryValue) => {
  const categoryRecords = getBlockCategoryRecords();
  const rawValue =
    categoryValue && typeof categoryValue === 'object'
      ? String(categoryValue.id || categoryValue.label || '')
      : String(categoryValue || '');
  const overrideId = getBlockCategoryOverrides()[blockId];
  const mappedId = overrideId || getLegacyCategoryMap()[rawValue] || rawValue;
  const matchIndex = categoryRecords.findIndex((categoryRecord) => categoryRecord.id === mappedId);
  const resolvedIndex = matchIndex >= 0 ? matchIndex : categoryRecords.length - 1;
  return { ...categoryRecords[resolvedIndex], order: resolvedIndex };
};

export default resolveBlockCategoryRecord;
