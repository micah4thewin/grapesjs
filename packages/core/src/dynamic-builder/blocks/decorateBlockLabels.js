import buildBlockCardLabelMarkup from './buildBlockCardLabelMarkup.js';
import getContentBlockHints from './getContentBlockHints.js';
import getStructureBlockHints from './getStructureBlockHints.js';

const decorateBlockLabels = (editor) => {
  const hintRecords = { ...getStructureBlockHints(), ...getContentBlockHints() };
  editor.BlockManager.getAll().forEach((blockModel) => {
    const hintText = hintRecords[blockModel.get('id') || blockModel.id];
    if (!hintText) return;
    const currentLabel = String(blockModel.get('label') || '');
    if (currentLabel.indexOf('gjs-db-block-hint') >= 0) return;
    blockModel.set({
      label: buildBlockCardLabelMarkup(currentLabel, hintText),
      attributes: { ...(blockModel.get('attributes') || {}), title: hintText },
    });
  });
};

export default decorateBlockLabels;
