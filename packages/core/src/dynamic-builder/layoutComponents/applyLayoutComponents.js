import registerLayoutCanvasStyles from './registerLayoutCanvasStyles.js';
import registerLayoutComponentTypes from './registerLayoutComponentTypes.js';
import watchColumnPresetUpdates from './watchColumnPresetUpdates.js';
import wireSectionToolbarAddButton from './wireSectionToolbarAddButton.js';
import watchSectionBackgroundUpdates from './watchSectionBackgroundUpdates.js';
import watchStackMobileClassUpdates from './watchStackMobileClassUpdates.js';

const applyLayoutComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.layoutComponents) || {};
  registerLayoutComponentTypes(editor);
  registerLayoutCanvasStyles(editor, moduleOptions);
  watchSectionBackgroundUpdates(editor);
  watchStackMobileClassUpdates(editor);
  watchColumnPresetUpdates(editor);
  wireSectionToolbarAddButton(editor);
};

export default applyLayoutComponents;
