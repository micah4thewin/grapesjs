import showActionToastNotice from '../support/showActionToastNotice.js';
import getNextBlockSuggestions from './getNextBlockSuggestions.js';
import insertBlockContent from './insertBlockContent.js';

const suggestNextBlockAfterDrop = (editor, droppedComponents, blockModel) => {
  const blockId = String(blockModel.get('id') || blockModel.id);
  const suggestedBlocks = (getNextBlockSuggestions()[blockId] || [])
    .map((suggestedId) => editor.BlockManager.get(suggestedId))
    .filter(Boolean);
  if (!suggestedBlocks.length) return null;
  const droppedList = (Array.isArray(droppedComponents) ? droppedComponents : [droppedComponents]).filter(Boolean);
  const anchorComponent = droppedList[droppedList.length - 1];
  const suggestedLabels = suggestedBlocks.map((suggestedBlock) => String(suggestedBlock.get('label')));
  const messageText =
    'After ' + String(blockModel.get('label')) + ', pages usually continue with ' + suggestedLabels.join(', ') + '.';
  return showActionToastNotice(editor, messageText, {
    actionLabel: 'Add ' + suggestedLabels[0],
    onAction: () => {
      anchorComponent && anchorComponent.parent && anchorComponent.parent() && editor.select(anchorComponent);
      insertBlockContent(editor, suggestedBlocks[0]);
    },
  });
};

export default suggestNextBlockAfterDrop;
