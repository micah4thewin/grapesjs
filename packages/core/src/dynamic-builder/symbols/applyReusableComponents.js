import buildSymbolCanvasCss from './buildSymbolCanvasCss.js';
import buildSymbolEditorOnlyCss from './buildSymbolEditorOnlyCss.js';
import buildSymbolTypeDefinition from './buildSymbolTypeDefinition.js';
import getSymbolEditorCss from './getSymbolEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openSymbolLibraryModal from './openSymbolLibraryModal.js';
import registerCanvasStyles from '../support/registerCanvasStyles.js';
import registerCommandSet from '../support/registerCommandSet.js';
import registerComponentTypeSet from '../support/registerComponentTypeSet.js';
import registerEditorOnlyCanvasStyles from '../support/registerEditorOnlyCanvasStyles.js';
import runCreateSymbolCommand from './runCreateSymbolCommand.js';
import runDetachSymbolCommand from './runDetachSymbolCommand.js';
import runEditSymbolCommand from './runEditSymbolCommand.js';
import seedSymbolLibrary from './seedSymbolLibrary.js';
import watchSymbolBlockLibrary from './watchSymbolBlockLibrary.js';
import watchSymbolInstances from './watchSymbolInstances.js';
import wireSymbolToolbarActions from './wireSymbolToolbarActions.js';

const applyReusableComponents = (editor, pluginOptions) => {
  const moduleOptions = (pluginOptions && pluginOptions.symbols) || {};
  registerComponentTypeSet(editor, [buildSymbolTypeDefinition()]);
  registerCanvasStyles(editor, 'db-css-symbols-base', buildSymbolCanvasCss());
  registerEditorOnlyCanvasStyles(editor, 'db-symbols-canvas-editor-only', buildSymbolEditorOnlyCss());
  seedSymbolLibrary(editor, moduleOptions);
  watchSymbolInstances(editor);
  watchSymbolBlockLibrary(editor);
  wireSymbolToolbarActions(editor);
  registerCommandSet(editor, {
    'db:open-symbols': (commandEditor) => openSymbolLibraryModal(commandEditor),
    'db:create-symbol': (commandEditor) => runCreateSymbolCommand(commandEditor),
    'db:edit-symbol': (commandEditor) => runEditSymbolCommand(commandEditor),
    'db:detach-symbol': (commandEditor) => runDetachSymbolCommand(commandEditor),
  });
  const injectSymbolEditorStyles = () => injectEditorStylesOnce(editor, 'db-css-symbols-editor', getSymbolEditorCss());
  injectSymbolEditorStyles();
  if (editor.onReady) editor.onReady(injectSymbolEditorStyles);
};

export default applyReusableComponents;
