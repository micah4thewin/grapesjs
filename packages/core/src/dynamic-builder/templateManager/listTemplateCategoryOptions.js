import getTemplateCategoryRecords from './getTemplateCategoryRecords.js';

const pageCategoryIds = ['marketing', 'business', 'personal', 'content', 'support', 'local', 'saved'];
const sectionCategoryIds = ['hero', 'features', 'socialProof', 'faq', 'callToAction', 'contact', 'saved'];

const listTemplateCategoryOptions = (kindName) => {
  const categoryRecords = getTemplateCategoryRecords();
  const categoryIds = kindName === 'page' ? pageCategoryIds : sectionCategoryIds;
  return categoryIds.map((categoryId) => ({ categoryId, label: categoryRecords[categoryId] || categoryId }));
};

export default listTemplateCategoryOptions;
