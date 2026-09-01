import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import buildContentBaseCss from './buildContentBaseCss.js';
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
  watchContentComponentUpdates(editor);
};

export default applyContentComponents;
