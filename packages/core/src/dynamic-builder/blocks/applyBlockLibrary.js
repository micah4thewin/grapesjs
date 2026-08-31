import registerBlockSet from '../support/registerBlockSet.js';
import buildDataBlocks from './buildDataBlocks.js';
import buildEmbedBlocks from './buildEmbedBlocks.js';
import buildFormBlocks from './buildFormBlocks.js';
import buildInteractiveBlocks from './buildInteractiveBlocks.js';
import buildLayoutBlocks from './buildLayoutBlocks.js';
import buildMarketingBlocks from './buildMarketingBlocks.js';
import buildMediaBlocks from './buildMediaBlocks.js';
import buildTypographyBlocks from './buildTypographyBlocks.js';
import registerBlockCompositionStyles from './registerBlockCompositionStyles.js';

const applyBlockLibrary = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.blocks) || {};
  const excludedBlockIds = Array.isArray(moduleOptions.excludeBlockIds) ? moduleOptions.excludeBlockIds : [];
  const blockDefinitions = [
    ...buildLayoutBlocks(),
    ...buildTypographyBlocks(),
    ...buildMediaBlocks(),
    ...buildInteractiveBlocks(),
    ...buildMarketingBlocks(),
    ...buildFormBlocks(),
    ...buildDataBlocks(),
    ...buildEmbedBlocks(),
  ].filter((blockDefinition) => excludedBlockIds.indexOf(blockDefinition.id) < 0);
  registerBlockSet(editor, blockDefinitions);
  registerBlockCompositionStyles(editor);
};

export default applyBlockLibrary;
