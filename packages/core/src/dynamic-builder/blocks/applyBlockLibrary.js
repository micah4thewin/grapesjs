import applyBlockPreviews from './applyBlockPreviews.js';
import registerBlockSet from '../support/registerBlockSet.js';
import buildCoverBlocks from '../coverSections/buildCoverBlocks.js';
import buildDataBlocks from './buildDataBlocks.js';
import buildEmbedBlocks from './buildEmbedBlocks.js';
import buildFormBlocks from './buildFormBlocks.js';
import buildInteractiveBlocks from './buildInteractiveBlocks.js';
import buildLayoutBlocks from './buildLayoutBlocks.js';
import buildMarketingBlocks from './buildMarketingBlocks.js';
import buildMediaBlocks from './buildMediaBlocks.js';
import buildTemplateBlocks from './buildTemplateBlocks.js';
import buildTypographyBlocks from './buildTypographyBlocks.js';
import decorateBlockLabels from './decorateBlockLabels.js';
import registerBlockCompositionStyles from './registerBlockCompositionStyles.js';
import registerBlockCompositionTypes from './registerBlockCompositionTypes.js';
import resolveBlockCategoryRecord from './resolveBlockCategoryRecord.js';
import sortBlockDefinitions from './sortBlockDefinitions.js';
import wireBlockPanelAccessibility from './wireBlockPanelAccessibility.js';
import wireNextBlockSuggestions from './wireNextBlockSuggestions.js';
import wireRootLevelDropWrapping from './wireRootLevelDropWrapping.js';
import wireTemplateDropGuard from './wireTemplateDropGuard.js';

const applyBlockLibrary = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.blocks) || {};
  const excludedBlockIds = Array.isArray(moduleOptions.excludeBlockIds) ? moduleOptions.excludeBlockIds : [];
  registerBlockCompositionTypes(editor);
  const blockDefinitions = [
    ...buildTemplateBlocks(),
    ...buildLayoutBlocks(),
    ...buildTypographyBlocks(),
    ...buildMediaBlocks(),
    ...buildInteractiveBlocks(),
    ...buildMarketingBlocks(),
    ...buildCoverBlocks(),
    ...buildFormBlocks(),
    ...buildDataBlocks(),
    ...buildEmbedBlocks(),
  ]
    .filter((blockDefinition) => excludedBlockIds.indexOf(blockDefinition.id) < 0)
    .map((blockDefinition) => ({
      ...blockDefinition,
      category: resolveBlockCategoryRecord(blockDefinition.id, blockDefinition.category),
    }));
  registerBlockSet(editor, sortBlockDefinitions(blockDefinitions));
  decorateBlockLabels(editor);
  applyBlockPreviews(editor, moduleOptions);
  registerBlockCompositionStyles(editor);
  wireTemplateDropGuard(editor);
  wireRootLevelDropWrapping(editor);
  moduleOptions.nextBlockSuggestions !== false && wireNextBlockSuggestions(editor);
  editor.onReady && editor.onReady(() => wireBlockPanelAccessibility(editor));
};

export default applyBlockLibrary;
