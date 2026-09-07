import isEditorLive from '../support/isEditorLive.js';
import offerAssetPhotoEdit from './offerAssetPhotoEdit.js';
import shouldOfferAssetPhotoEdit from './shouldOfferAssetPhotoEdit.js';

const offerDelay = 400;

const watchUploadedImageAssets = (editor) => {
  const session = { isReady: false, lastLoadAt: 0, pendingAsset: null, pendingAt: 0, offerTimer: 0 };
  const markProjectLoad = () => {
    session.lastLoadAt = Date.now();
    session.pendingAsset = null;
  };
  editor.on('project:load', markProjectLoad);
  editor.on('storage:start:load', markProjectLoad);
  editor.on('asset:add', (assetModel) => {
    if (!session.isReady || !shouldOfferAssetPhotoEdit(assetModel)) return;
    session.pendingAsset = assetModel;
    session.pendingAt = Date.now();
    clearTimeout(session.offerTimer);
    session.offerTimer = setTimeout(() => {
      if (!isEditorLive(editor)) return;
      const offeredAsset = session.pendingAsset;
      session.pendingAsset = null;
      if (!offeredAsset || session.lastLoadAt >= session.pendingAt) return;
      offerAssetPhotoEdit(editor, offeredAsset);
    }, offerDelay);
  });
  editor.on('destroy', () => clearTimeout(session.offerTimer));
  if (!editor.onReady) return session;
  editor.onReady(() =>
    setTimeout(() => {
      session.isReady = isEditorLive(editor);
    }, offerDelay),
  );
  return session;
};

export default watchUploadedImageAssets;
