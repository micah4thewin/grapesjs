import buildSymbolBlockDefinition from './buildSymbolBlockDefinition.js';
import listSymbolRecords from './listSymbolRecords.js';

const symbolBlockPrefix = 'db-symbol-block-';

const resolveBlockId = (blockModel) => String(blockModel.get('id') || blockModel.id || '');

const registerSymbolBlocks = (editor) => {
  const blockManager = editor.BlockManager;
  if (!blockManager) return;
  const symbolRecords = listSymbolRecords(editor);
  const wantedBlockIds = symbolRecords.map((symbolRecord) => symbolBlockPrefix + symbolRecord.id);
  blockManager
    .getAll()
    .filter((blockModel) => resolveBlockId(blockModel).indexOf(symbolBlockPrefix) === 0)
    .map((blockModel) => resolveBlockId(blockModel))
    .filter((blockId) => wantedBlockIds.indexOf(blockId) < 0)
    .forEach((blockId) => blockManager.remove(blockId));
  symbolRecords.forEach((symbolRecord) => {
    const blockId = symbolBlockPrefix + symbolRecord.id;
    const blockDefinition = buildSymbolBlockDefinition(editor, symbolRecord);
    const existingBlock = blockManager.get(blockId);
    if (existingBlock) {
      existingBlock.set({ label: blockDefinition.label, media: blockDefinition.media });
      return;
    }
    blockManager.add(blockId, blockDefinition);
  });
};

export default registerSymbolBlocks;
