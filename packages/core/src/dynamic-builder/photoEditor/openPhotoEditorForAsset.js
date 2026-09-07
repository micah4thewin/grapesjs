import applyEditedPhotoToAsset from './applyEditedPhotoToAsset.js';
import openPhotoEditorSession from './openPhotoEditorSession.js';

const openPhotoEditorForAsset = (editor, assetModel) => {
  if (!assetModel || typeof assetModel.get !== 'function') return false;
  return openPhotoEditorSession(editor, String(assetModel.get('src') || ''), (dataUrl) =>
    applyEditedPhotoToAsset(editor, assetModel, dataUrl),
  );
};

export default openPhotoEditorForAsset;
