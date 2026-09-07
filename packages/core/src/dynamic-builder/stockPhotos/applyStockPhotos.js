import getStockPhotosEditorCss from './getStockPhotosEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import openStockPhotoModal from './openStockPhotoModal.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolveStockPhotoOptions from './resolveStockPhotoOptions.js';
import wireAssetManagerStockButton from './wireAssetManagerStockButton.js';
import wireImageToolbarStockButton from './wireImageToolbarStockButton.js';

const applyStockPhotos = (editor, pluginOptions) => {
  const moduleOptions = resolveStockPhotoOptions(pluginOptions);
  if (!moduleOptions.enabled) return;
  const editorModel = editor.getModel && editor.getModel();
  if (editorModel) editorModel.set('dbStockPhotoOptions', moduleOptions);
  const readOptions = () => (editorModel && editorModel.get('dbStockPhotoOptions')) || moduleOptions;
  if (editorModel && editorModel.get('dbStockPhotosReady')) return;
  if (editorModel) editorModel.set('dbStockPhotosReady', true);
  registerCommandSet(editor, {
    'db:open-stock-photos': (commandEditor) => openStockPhotoModal(commandEditor, readOptions()),
  });
  wireImageToolbarStockButton(editor);
  wireAssetManagerStockButton(editor);
  const injectStyles = () => injectEditorStylesOnce(editor, 'db-css-stock-photos', getStockPhotosEditorCss());
  injectStyles();
  if (editor.onReady) editor.onReady(() => injectStyles());
};

export default applyStockPhotos;
