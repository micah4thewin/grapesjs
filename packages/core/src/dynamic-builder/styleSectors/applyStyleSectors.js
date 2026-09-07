import getStyleSectorDefinitions from './getStyleSectorDefinitions.js';
import injectStyleSectorEditorStyles from './injectStyleSectorEditorStyles.js';
import mountStyleScopeToggle from './mountStyleScopeToggle.js';
import mountTokenBindingButtons from './mountTokenBindingButtons.js';
import openSectorWhenRevealed from './openSectorWhenRevealed.js';
import registerPresetPropertyType from './registerPresetPropertyType.js';
import registerStyleSectorSet from './registerStyleSectorSet.js';
import removeDefaultStyleSectors from './removeDefaultStyleSectors.js';
import updateInheritedFontLabel from './updateInheritedFontLabel.js';

const applyStyleSectors = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.styleSectors) || {};
  if (!editor || !editor.StyleManager) return;
  registerPresetPropertyType(editor);
  removeDefaultStyleSectors(editor);
  registerStyleSectorSet(editor, getStyleSectorDefinitions(moduleOptions, editor));
  if (!editor.on) return;
  openSectorWhenRevealed(editor, ['flexbox', 'grid']);
  if (moduleOptions.componentFirst !== false && editor.SelectorManager && editor.SelectorManager.setComponentFirst) {
    editor.SelectorManager.setComponentFirst(true);
  }
  mountStyleScopeToggle(editor);
  mountTokenBindingButtons(editor);
  updateInheritedFontLabel(editor);
  injectStyleSectorEditorStyles(editor);
};

export default applyStyleSectors;
