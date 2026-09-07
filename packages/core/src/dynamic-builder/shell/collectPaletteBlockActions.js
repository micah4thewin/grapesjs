import insertBlockAtSelection from './insertBlockAtSelection.js';

const collectPaletteBlockActions = (editor) => {
  const blocksModule = editor.Blocks;
  if (!blocksModule || !blocksModule.getAll) return [];
  return blocksModule.getAll().map((blockModel) => {
    const blockId = String(blockModel.get('id') || blockModel.cid);
    const blockLabel = String(blockModel.getLabel ? blockModel.getLabel() : blockModel.get('label') || '')
      .replace(/<[^>]*>/g, '')
      .trim();
    const categoryLabel = blockModel.getCategoryLabel ? String(blockModel.getCategoryLabel() || '') : '';
    return {
      actionId: `block:${blockId}`,
      groupTitle: 'Blocks',
      label: `Insert block: ${blockLabel || blockId}`,
      iconName: 'blocks',
      keywords: `block insert add ${categoryLabel} ${blockId}`,
      keysText: '',
      hintText: categoryLabel,
      prefixOnly: true,
      runAction: () => insertBlockAtSelection(editor, blockModel),
    };
  });
};

export default collectPaletteBlockActions;
