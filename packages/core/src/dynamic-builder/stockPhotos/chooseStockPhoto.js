import applyStockPhotoToComponent from './applyStockPhotoToComponent.js';
import buildStockPhotoAssetRecord from './buildStockPhotoAssetRecord.js';
import compressStockPhotoFile from './compressStockPhotoFile.js';
import describeStockPhotoAddedText from './describeStockPhotoAddedText.js';
import downloadStockPhotoFile from './downloadStockPhotoFile.js';
import isEditorLive from '../support/isEditorLive.js';
import resolveStockPhotoTarget from './resolveStockPhotoTarget.js';
import showToastNotice from '../support/showToastNotice.js';

const chooseStockPhoto = async (editor, moduleOptions, photoRecord) => {
  if (!photoRecord) return false;
  const targetComponent = resolveStockPhotoTarget(editor);
  showToastNotice(editor, 'Adding the picture to this site...', { duration: 2500 });
  const photoFile = await downloadStockPhotoFile(photoRecord);
  const compressedAsset = await compressStockPhotoFile(photoFile, moduleOptions.maxImageDimension);
  if (!isEditorLive(editor)) return false;
  const assetRecord = buildStockPhotoAssetRecord(photoRecord, compressedAsset, photoFile ? photoFile.size : 0);
  if (editor.Assets && editor.Assets.add) editor.Assets.add(assetRecord);
  const placedOnPage = applyStockPhotoToComponent(targetComponent, photoRecord, assetRecord.src);
  showToastNotice(editor, describeStockPhotoAddedText(assetRecord, placedOnPage), { kind: 'success', duration: 6000 });
  return true;
};

export default chooseStockPhoto;
