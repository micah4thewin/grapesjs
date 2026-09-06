import getPageLevelComponentTypes from '../support/getPageLevelComponentTypes.js';
import getSectionContentComponentTypes from '../support/getSectionContentComponentTypes.js';

const isStructuralBlock = (blockModel) => {
  if (!blockModel || !blockModel.get) return false;
  const categoryValue = blockModel.get('category');
  const categoryId =
    categoryValue && typeof categoryValue === 'object'
      ? String((categoryValue.get && categoryValue.get('id')) || categoryValue.id || '')
      : String(categoryValue || '');
  if (categoryId === 'pages' || categoryId === 'sections') return true;
  const blockContent = blockModel.get('content');
  const contentType =
    blockContent && typeof blockContent === 'object' && !Array.isArray(blockContent) ? blockContent.type : '';
  return (
    [...getPageLevelComponentTypes(), ...getSectionContentComponentTypes()].indexOf(String(contentType || '')) >= 0
  );
};

export default isStructuralBlock;
