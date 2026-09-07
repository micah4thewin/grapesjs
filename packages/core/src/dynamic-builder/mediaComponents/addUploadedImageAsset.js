import compressImageFileToAsset from './compressImageFileToAsset.js';
import describeUploadSavings from './describeUploadSavings.js';
import estimateDataUrlBytes from '../photoEditor/estimateDataUrlBytes.js';
import readFileAsDataUrl from './readFileAsDataUrl.js';
import showToastNotice from '../support/showToastNotice.js';

const isCompressibleImage = (uploadedFile) =>
  uploadedFile.type !== 'image/svg+xml' && uploadedFile.type !== 'image/gif';

const addUploadedImageAsset = async (editor, uploadedFile, maxDimension) => {
  const originalDataUrl = await readFileAsDataUrl(uploadedFile);
  const originalRecord = { src: originalDataUrl, name: uploadedFile.name, type: 'image' };
  if (!isCompressibleImage(uploadedFile)) {
    editor.Assets.add({ ...originalRecord, dbOriginalBytes: uploadedFile.size });
    showToastNotice(editor, uploadedFile.name + ' added', { kind: 'success' });
    return;
  }
  showToastNotice(editor, 'Optimising ' + uploadedFile.name + '...', { duration: 1800 });
  const compressedAsset = await compressImageFileToAsset(uploadedFile, maxDimension);
  const keepsCompressed = compressedAsset.src.length < originalDataUrl.length;
  const storedAsset = keepsCompressed
    ? compressedAsset
    : { ...originalRecord, width: compressedAsset.sourceWidth, height: compressedAsset.sourceHeight };
  const storedBytes = estimateDataUrlBytes(storedAsset.src);
  editor.Assets.add({ ...storedAsset, dbOriginalBytes: uploadedFile.size, dbStoredBytes: storedBytes });
  showToastNotice(editor, describeUploadSavings(uploadedFile.name, uploadedFile.size, storedBytes, storedAsset.width), {
    kind: 'success',
    duration: 5000,
  });
};

export default addUploadedImageAsset;
