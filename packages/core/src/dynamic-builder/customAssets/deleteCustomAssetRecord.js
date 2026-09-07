import getCustomAssetAdapters from './getCustomAssetAdapters.js';
import isEditorLive from '../support/isEditorLive.js';
import refreshCustomAssetsPanels from './refreshCustomAssetsPanels.js';
import showToastNotice from '../support/showToastNotice.js';

const deleteCustomAssetRecord = (editor, rootElement, assetKind, recordId) => {
  const adapters = getCustomAssetAdapters(editor);
  const deleteRecord = assetKind === 'icons' ? adapters.icons.deleteIcon : adapters.fonts.deleteFont;
  return Promise.resolve(deleteRecord(recordId))
    .then(() => {
      if (!isEditorLive(editor)) return false;
      showToastNotice(editor, assetKind === 'icons' ? 'Icon removed' : 'Font removed', { kind: 'success' });
      editor.trigger('db:custom-asset:removed', { kind: assetKind, recordId: String(recordId) });
      return refreshCustomAssetsPanels(editor, rootElement);
    })
    .catch((deleteError) => {
      if (isEditorLive(editor)) showToastNotice(editor, String(deleteError.message || deleteError), { kind: 'error' });
      return false;
    });
};

export default deleteCustomAssetRecord;
