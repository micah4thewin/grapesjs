import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';
import buildContentBaseCss from './buildContentBaseCss.js';
import buildContentEditorCanvasCss from './buildContentEditorCanvasCss.js';
import createButtonGroupTypeDefinition from './createButtonGroupTypeDefinition.js';
import createButtonTypeDefinition from './createButtonTypeDefinition.js';
import createCalloutTypeDefinition from './createCalloutTypeDefinition.js';
import createHeadingTypeDefinition from './createHeadingTypeDefinition.js';
import createListTypeDefinition from './createListTypeDefinition.js';
import createQuoteTypeDefinition from './createQuoteTypeDefinition.js';
import createTextTypeDefinition from './createTextTypeDefinition.js';
import extendCoreLinkTraits from './extendCoreLinkTraits.js';
import resolveContentTextDefaults from './resolveContentTextDefaults.js';
import watchContentComponentUpdates from './watchContentComponentUpdates.js';
import watchPlaceholderCopyUpdates from './watchPlaceholderCopyUpdates.js';
import wireListItemEditing from './wireListItemEditing.js';
import wireListToolbarButtons from './wireListToolbarButtons.js';

const applyContentComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.contentComponents) || {};
  const contentTextDefaults = resolveContentTextDefaults(moduleOptions);
  registerComponentTypeSet(editor, [
    createHeadingTypeDefinition(contentTextDefaults),
    createTextTypeDefinition(contentTextDefaults),
    createQuoteTypeDefinition(contentTextDefaults),
    createCalloutTypeDefinition(contentTextDefaults),
    createButtonTypeDefinition(contentTextDefaults),
    createButtonGroupTypeDefinition(contentTextDefaults),
    createListTypeDefinition(contentTextDefaults),
  ]);
  extendCoreLinkTraits(editor);
  registerCanvasStyles(editor, 'db-css-content-base', buildContentBaseCss());
  registerEditorOnlyCanvasStyles(editor, 'db-css-content-editor-hints', buildContentEditorCanvasCss());
  watchContentComponentUpdates(editor);
  watchPlaceholderCopyUpdates(editor, contentTextDefaults);
  wireListItemEditing(editor);
  wireListToolbarButtons(editor);
};

export default applyContentComponents;
