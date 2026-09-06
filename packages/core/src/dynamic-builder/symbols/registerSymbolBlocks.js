import resolveBlockPreviewMarkup from '../blockPreviews/resolveBlockPreviewMarkup.js';
import listSymbolRecords from './listSymbolRecords.js';

const symbolBlockPrefix = 'db-symbol-block-';

const registerSymbolBlocks = (editor) => {
  const blockManager = editor.BlockManager;
  if (!blockManager) return;
  blockManager
    .getAll()
    .filter((blockModel) => String(blockModel.get('id') || blockModel.id).indexOf(symbolBlockPrefix) === 0)
    .map((blockModel) => String(blockModel.get('id') || blockModel.id))
    .forEach((blockId) => blockManager.remove(blockId));
  listSymbolRecords(editor).forEach((symbolRecord) => {
    blockManager.add(symbolBlockPrefix + symbolRecord.id, {
      label: String(symbolRecord.name || 'Reusable component'),
      category: 'Reusable',
      media: resolveBlockPreviewMarkup('db-symbol', 'Reusable'),
      select: true,
      attributes: { title: 'Reusable — edit once, updates everywhere' },
      content: { type: 'db-symbol', attributes: { 'data-db-type': 'symbol', 'data-db-symbol': symbolRecord.id } },
    });
  });
};

export default registerSymbolBlocks;
