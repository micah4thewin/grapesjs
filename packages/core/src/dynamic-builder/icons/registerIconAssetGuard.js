import sanitizeSvgAssetRecord from './sanitizeSvgAssetRecord.js';

const registerIconAssetGuard = (editor) => {
  editor.on('asset:add', (addedAsset) => sanitizeSvgAssetRecord(editor, addedAsset));
};

export default registerIconAssetGuard;
