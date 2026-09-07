import isTemplateBlock from './isTemplateBlock.js';
import openTemplateDropModal from './openTemplateDropModal.js';

const wireTemplateDropGuard = (editor) => {
  let pageHadContent = false;
  editor.on('block:drag:start', (blockModel) => {
    pageHadContent = isTemplateBlock(blockModel) && editor.getWrapper().components().length > 0;
  });
  editor.on('block:drag:stop', (droppedComponents, blockModel) => {
    const hadContent = pageHadContent;
    pageHadContent = false;
    if (!hadContent || !droppedComponents || !isTemplateBlock(blockModel)) return;
    const droppedList = (Array.isArray(droppedComponents) ? droppedComponents : [droppedComponents]).filter(Boolean);
    droppedList.length && setTimeout(() => openTemplateDropModal(editor, blockModel, droppedList), 30);
  });
};

export default wireTemplateDropGuard;
