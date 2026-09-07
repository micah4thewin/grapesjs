import resolveBlockPreviewMarkup from '../blockPreviews/resolveBlockPreviewMarkup.js';
import resolveDedicatedPreviewMarkup from '../blockPreviews/resolveDedicatedPreviewMarkup.js';

const resolveCategoryName = (blockModel) => {
  const categoryValue = blockModel.get('category');
  if (!categoryValue) return '';
  if (typeof categoryValue === 'string') return categoryValue;
  return String(categoryValue.id || categoryValue.label || '');
};

const applyBlockPreviews = (editor, moduleOptions = {}) => {
  const previewForeignBlocks = Boolean(moduleOptions.previewForeignBlocks);
  editor.BlockManager.getAll().forEach((blockModel) => {
    const blockId = String(blockModel.get('id') || blockModel.id);
    if (blockId.indexOf('db-') === 0) {
      const dedicatedMarkup = resolveDedicatedPreviewMarkup(blockId);
      dedicatedMarkup && blockModel.set('media', dedicatedMarkup);
      return;
    }
    if (blockModel.get('media') && !previewForeignBlocks) return;
    const fallbackMarkup = resolveBlockPreviewMarkup(blockId, resolveCategoryName(blockModel));
    fallbackMarkup && blockModel.set('media', fallbackMarkup);
  });
};

export default applyBlockPreviews;
