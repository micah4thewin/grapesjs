import addUploadedImageAsset from './addUploadedImageAsset.js';
import describeUploadSkipReason from './describeUploadSkipReason.js';
import readUploadedFiles from './readUploadedFiles.js';
import showToastNotice from '../support/showToastNotice.js';

const handleAssetFileUpload = async (editor, uploadEvent, maxDimension) => {
  for (const uploadedFile of readUploadedFiles(uploadEvent)) {
    const skipReason = describeUploadSkipReason(uploadedFile);
    if (skipReason) {
      showToastNotice(editor, skipReason, { kind: 'error', duration: 5000 });
      continue;
    }
    try {
      await addUploadedImageAsset(editor, uploadedFile, maxDimension);
    } catch (uploadError) {
      showToastNotice(editor, 'Could not add ' + uploadedFile.name + '. Try a different picture.', {
        kind: 'error',
        duration: 5000,
      });
    }
  }
};

export default handleAssetFileUpload;
