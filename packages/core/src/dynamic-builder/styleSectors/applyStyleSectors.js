import getStyleSectorDefinitions from './getStyleSectorDefinitions.js';
import openSectorWhenRevealed from './openSectorWhenRevealed.js';
import registerStyleSectorSet from './registerStyleSectorSet.js';
import removeDefaultStyleSectors from './removeDefaultStyleSectors.js';

const applyStyleSectors = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.styleSectors) || {};
  if (!editor || !editor.StyleManager) return;
  removeDefaultStyleSectors(editor);
  registerStyleSectorSet(editor, getStyleSectorDefinitions(moduleOptions, editor));
  if (editor.on) openSectorWhenRevealed(editor, ['flexbox', 'grid']);
};

export default applyStyleSectors;
