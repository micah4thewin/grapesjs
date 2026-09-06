import getContentBlockHints from './getContentBlockHints.js';
import getStructureBlockHints from './getStructureBlockHints.js';

const decorateBlockLabels = (editor) => {
  const hintRecords = { ...getStructureBlockHints(), ...getContentBlockHints() };
  editor.BlockManager.getAll().forEach((blockModel) => {
    const blockId = String(blockModel.get('id') || blockModel.id);
    const hintText = hintRecords[blockId];
    if (!hintText) return;
    blockModel.set({ attributes: { ...(blockModel.get('attributes') || {}), title: hintText } });
  });
};

export default decorateBlockLabels;
