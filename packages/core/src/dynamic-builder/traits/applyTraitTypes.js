import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import registerTraitTypeSet from '../support/registerTraitTypeSet.js';
import createAnalyticsEventTraitDefinition from './createAnalyticsEventTraitDefinition.js';
import createCodeTraitDefinition from '../codeEditor/createCodeTraitDefinition.js';
import createAriaLabelTraitDefinition from './createAriaLabelTraitDefinition.js';
import createAssetTraitDefinition from './createAssetTraitDefinition.js';
import createBindingPathTraitDefinition from './createBindingPathTraitDefinition.js';
import createConditionTraitDefinition from './createConditionTraitDefinition.js';
import createDateTraitDefinition from './createDateTraitDefinition.js';
import createIconPickerTraitDefinition from './createIconPickerTraitDefinition.js';
import createJsonTraitDefinition from './createJsonTraitDefinition.js';
import createMenuItemsTraitDefinition from './createMenuItemsTraitDefinition.js';
import createPageLinkTraitDefinition from './createPageLinkTraitDefinition.js';
import createSliderTraitDefinition from './createSliderTraitDefinition.js';
import createTextareaTraitDefinition from './createTextareaTraitDefinition.js';
import createUrlTraitDefinition from './createUrlTraitDefinition.js';
import getCodeEditorCss from '../codeEditor/getCodeEditorCss.js';
import getTraitEditorCss from './getTraitEditorCss.js';

const applyTraitTypes = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.traits) || {};
  registerTraitTypeSet(editor, {
    'db-slider': createSliderTraitDefinition(),
    'db-textarea-trait': createTextareaTraitDefinition(),
    'db-code': createCodeTraitDefinition(editor),
    'db-url': createUrlTraitDefinition(),
    'db-asset': createAssetTraitDefinition(editor),
    'db-date': createDateTraitDefinition(),
    'db-json': createJsonTraitDefinition(),
    'db-analytics-event': createAnalyticsEventTraitDefinition(),
    'db-binding-path': createBindingPathTraitDefinition(editor, moduleOptions),
    'db-condition': createConditionTraitDefinition(),
    'db-aria-label': createAriaLabelTraitDefinition(),
    'db-page-link': createPageLinkTraitDefinition(editor),
    'db-icon-picker': createIconPickerTraitDefinition(editor),
    'db-menu-items': createMenuItemsTraitDefinition(),
  });
  const injectTraitEditorStyles = () => {
    if (!editor.getContainer || !editor.getContainer()) return;
    injectEditorStylesOnce(editor, 'db-css-traits-editor', getTraitEditorCss());
    injectEditorStylesOnce(editor, 'db-css-code-editor', getCodeEditorCss());
  };
  injectTraitEditorStyles();
  if (editor.onReady) editor.onReady(() => injectTraitEditorStyles());
};

export default applyTraitTypes;
