import escapeHtmlText from '../support/escapeHtmlText.js';
import getTemplateCategoryRecords from './getTemplateCategoryRecords.js';

const updateTemplateCategoryOptions = (rootElement, templateRecords, selectedCategoryId) => {
  const selectElement = rootElement.querySelector('[data-db-template-category]');
  if (!selectElement) return 'all';
  const categoryRecords = getTemplateCategoryRecords();
  const presentIds = templateRecords
    .map((templateRecord) => templateRecord.categoryId)
    .filter((categoryId, categoryIndex, allIds) => allIds.indexOf(categoryId) === categoryIndex);
  const nextCategoryId = presentIds.indexOf(selectedCategoryId) >= 0 ? selectedCategoryId : 'all';
  selectElement.innerHTML = ['<option value="all">All categories</option>']
    .concat(
      presentIds.map(
        (categoryId) =>
          `<option value="${escapeHtmlText(categoryId)}">${escapeHtmlText(categoryRecords[categoryId] || categoryId)}</option>`,
      ),
    )
    .join('');
  selectElement.value = nextCategoryId;
  return nextCategoryId;
};

export default updateTemplateCategoryOptions;
