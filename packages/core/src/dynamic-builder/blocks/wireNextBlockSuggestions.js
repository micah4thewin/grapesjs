import isTemplateBlock from './isTemplateBlock.js';
import suggestNextBlockAfterDrop from './suggestNextBlockAfterDrop.js';

const wireNextBlockSuggestions = (editor) => {
  editor.on('block:drag:stop', (droppedComponents, blockModel) => {
    if (!droppedComponents || !blockModel || !blockModel.get || isTemplateBlock(blockModel)) return;
    setTimeout(() => suggestNextBlockAfterDrop(editor, droppedComponents, blockModel), 80);
  });
};

export default wireNextBlockSuggestions;
