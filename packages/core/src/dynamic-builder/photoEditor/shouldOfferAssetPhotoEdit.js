import isEditableImageAsset from './isEditableImageAsset.js';

const shouldOfferAssetPhotoEdit = (assetModel) => {
  if (!isEditableImageAsset(assetModel)) return false;
  return !assetModel.get('dbEditedAt');
};

export default shouldOfferAssetPhotoEdit;
