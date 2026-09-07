import getTemplateCategoryRecords from './getTemplateCategoryRecords.js';

const buildSearchText = (templateRecord, categoryRecords) =>
  [
    templateRecord.name,
    templateRecord.description,
    templateRecord.categoryId,
    categoryRecords[templateRecord.categoryId] || '',
  ]
    .join(' ')
    .toLowerCase();

const filterTemplateRecords = (templateRecords, queryText, categoryId) => {
  const categoryRecords = getTemplateCategoryRecords();
  const queryTokens = String(queryText || '')
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return templateRecords.filter((templateRecord) => {
    if (categoryId && categoryId !== 'all' && templateRecord.categoryId !== categoryId) return false;
    const searchText = buildSearchText(templateRecord, categoryRecords);
    return queryTokens.every((queryToken) => searchText.indexOf(queryToken) >= 0);
  });
};

export default filterTemplateRecords;
