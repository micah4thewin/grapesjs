import getStyleSectorDefinitions from './getStyleSectorDefinitions.js';
import registerStyleSectorSet from './registerStyleSectorSet.js';
import removeDefaultStyleSectors from './removeDefaultStyleSectors.js';

const applyStyleSectors = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.styleSectors) || {};
  if (!editor || !editor.StyleManager) return;
  removeDefaultStyleSectors(editor);
  registerStyleSectorSet(editor, getStyleSectorDefinitions(moduleOptions));
};

export default applyStyleSectors;
