import registerMarketingCanvasStyles from './registerMarketingCanvasStyles.js';
import registerMarketingComponentTypes from './registerMarketingComponentTypes.js';
import watchMarketingComponentUpdates from './watchMarketingComponentUpdates.js';

const applyMarketingComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.marketingComponents) || {};
  registerMarketingComponentTypes(editor);
  registerMarketingCanvasStyles(editor, moduleOptions);
  watchMarketingComponentUpdates(editor);
};

export default applyMarketingComponents;
