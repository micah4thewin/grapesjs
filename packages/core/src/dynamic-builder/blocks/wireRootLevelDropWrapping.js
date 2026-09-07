import isTemplateBlock from './isTemplateBlock.js';
import wrapRootLevelComponents from './wrapRootLevelComponents.js';

const wireRootLevelDropWrapping = (editor) => {
  editor.on('block:drag:stop', (droppedComponents, blockModel) => {
    if (!droppedComponents || !blockModel || !blockModel.get) return;
    const blockId = String(blockModel.get('id') || blockModel.id);
    if (blockId.indexOf('db-') !== 0 || isTemplateBlock(blockModel)) return;
    wrapRootLevelComponents(editor, droppedComponents);
  });
};

export default wireRootLevelDropWrapping;
