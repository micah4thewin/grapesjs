import buildBlockCardRenderer from './buildBlockCardRenderer.js';
import getBlockHintRecords from './getBlockHintRecords.js';
import getBlockSearchKeywords from './getBlockSearchKeywords.js';

const decorateBlockLabels = (editor) => {
  const hintRecords = getBlockHintRecords();
  const keywordRecords = getBlockSearchKeywords();
  editor.BlockManager.getAll().forEach((blockModel) => {
    const blockId = String(blockModel.get('id') || blockModel.id);
    const labelText = String(blockModel.get('label') || '');
    const existingAttributes = blockModel.get('attributes') || {};
    const hintText = hintRecords[blockId] || String(existingAttributes.title || '');
    const cardAttributes = {
      ...existingAttributes,
      tabindex: '0',
      role: 'button',
      'aria-label': hintText ? labelText + '. ' + hintText : labelText,
      'data-db-block-id': blockId,
    };
    if (hintText) cardAttributes.title = hintText;
    const rendersHint = Boolean(hintRecords[blockId] || keywordRecords[blockId]);
    blockModel.set({
      attributes: cardAttributes,
      ...(rendersHint ? { render: buildBlockCardRenderer(hintText, keywordRecords[blockId] || '') } : {}),
    });
  });
};

export default decorateBlockLabels;
