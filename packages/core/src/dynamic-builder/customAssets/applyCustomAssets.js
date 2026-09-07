import getCustomAssetsEditorCss from './getCustomAssetsEditorCss.js';
import injectEditorStylesOnce from '../support/injectEditorStylesOnce.js';
import isEditorLive from '../support/isEditorLive.js';
import openCustomAssetsModal from './openCustomAssetsModal.js';
import refreshCustomFontAssets from './refreshCustomFontAssets.js';
import refreshCustomIconAssets from './refreshCustomIconAssets.js';
import registerCommandSet from '../support/registerCommandSet.js';
import resolveCustomAssetAdapters from './resolveCustomAssetAdapters.js';

const applyCustomAssets = (editor, pluginOptions) => {
  editor.getModel().set('dbCustomAssetAdapters', resolveCustomAssetAdapters(pluginOptions));
  registerCommandSet(editor, {
    'db:open-custom-assets': (commandEditor, senderRecord, commandOptions) =>
      openCustomAssetsModal(commandEditor, (commandOptions && commandOptions.tabId) || 'fonts'),
  });
  const loadStoredAssets = () => {
    if (!isEditorLive(editor)) return;
    injectEditorStylesOnce(editor, 'db-css-custom-assets', getCustomAssetsEditorCss());
    refreshCustomFontAssets(editor);
    refreshCustomIconAssets(editor);
  };
  loadStoredAssets();
  if (editor.onReady) editor.onReady(loadStoredAssets);
  editor.on('project:load', loadStoredAssets);
};

export default applyCustomAssets;
