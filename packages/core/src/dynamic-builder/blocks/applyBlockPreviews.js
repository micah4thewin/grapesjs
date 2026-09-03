import resolveBlockPreviewMarkup from '../blockPreviews/resolveBlockPreviewMarkup.js';

const resolveCategoryName = (blockModel) => {
  const categoryValue = blockModel.get('category');
  if (!categoryValue) return '';
  if (typeof categoryValue === 'string') return categoryValue;
  return String(categoryValue.id || categoryValue.label || '');
};

const applyBlockPreviews = (editor) => {
  editor.BlockManager.getAll().forEach((blockModel) => {
    const blockId = String(blockModel.get('id') || blockModel.id);
    const previewMarkup = resolveBlockPreviewMarkup(blockId, resolveCategoryName(blockModel));
    if (previewMarkup) blockModel.set('media', previewMarkup);
  });
};

export default applyBlockPreviews;
