import compressImageFileToAsset from './compressImageFileToAsset.js';
import readFileAsDataUrl from './readFileAsDataUrl.js';

const handleAssetFileUpload = async (editor, uploadEvent, maxDimension) => {
  const fileList =
    (uploadEvent.dataTransfer && uploadEvent.dataTransfer.files) || (uploadEvent.target && uploadEvent.target.files);
  if (!fileList || !fileList.length) return;
  const uploadedFiles = [...fileList];
  for (const uploadedFile of uploadedFiles) {
    try {
      const isCompressibleImage =
        uploadedFile.type.indexOf('image/') === 0 &&
        uploadedFile.type !== 'image/svg+xml' &&
        uploadedFile.type !== 'image/gif';
      if (isCompressibleImage) {
        const compressedAsset = await compressImageFileToAsset(uploadedFile, maxDimension);
        const originalDataUrl = await readFileAsDataUrl(uploadedFile);
        const smallestSrc = compressedAsset.src.length < originalDataUrl.length ? compressedAsset.src : originalDataUrl;
        editor.Assets.add({ ...compressedAsset, src: smallestSrc });
      } else {
        const rawDataUrl = await readFileAsDataUrl(uploadedFile);
        editor.Assets.add({ src: rawDataUrl, name: uploadedFile.name, type: 'image' });
      }
    } catch (uploadError) {
      editor.trigger('db:save-status', { state: 'error', message: `Could not add ${uploadedFile.name}` });
    }
  }
};

export default handleAssetFileUpload;
