import registerMarketingCanvasStyles from './registerMarketingCanvasStyles.js';
import registerMarketingComponentTypes from './registerMarketingComponentTypes.js';
import registerMarketingEditorStyles from './registerMarketingEditorStyles.js';
import watchMarketingBlockDrops from './watchMarketingBlockDrops.js';
import watchMarketingComponentUpdates from './watchMarketingComponentUpdates.js';

const applyMarketingComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.marketingComponents) || {};
  registerMarketingComponentTypes(editor);
  registerMarketingCanvasStyles(editor, moduleOptions);
  registerMarketingEditorStyles(editor);
  watchMarketingComponentUpdates(editor);
  watchMarketingBlockDrops(editor);
};

export default applyMarketingComponents;
