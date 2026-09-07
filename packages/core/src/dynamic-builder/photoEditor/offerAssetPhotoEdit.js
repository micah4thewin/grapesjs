import describeAssetEditOffer from './describeAssetEditOffer.js';
import isEditorLive from '../support/isEditorLive.js';
import openPhotoEditorForAsset from './openPhotoEditorForAsset.js';
import showActionToastNotice from '../support/showActionToastNotice.js';

const offerAssetPhotoEdit = (editor, assetModel) => {
  if (!isEditorLive(editor) || !assetModel) return false;
  const toastSession = showActionToastNotice(editor, describeAssetEditOffer(assetModel), {
    kind: 'success',
    actionLabel: 'Edit photo',
    duration: 9000,
    onAction: () => openPhotoEditorForAsset(editor, assetModel),
  });
  if (toastSession && toastSession.toastElement) toastSession.toastElement.setAttribute('data-db-photo-offer', 'true');
  return Boolean(toastSession);
};

export default offerAssetPhotoEdit;
