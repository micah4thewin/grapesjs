import sanitizeSvgAssetRecord from './sanitizeSvgAssetRecord.js';

const registerIconAssetGuard = (editor) => {
  const sanitizeAllAssets = () => {
    const assetList = editor.Assets && editor.Assets.getAll ? editor.Assets.getAll() : null;
    if (!assetList || !assetList.models) return;
    [...assetList.models].forEach((assetRecord) => sanitizeSvgAssetRecord(editor, assetRecord));
  };
  editor.on('asset:add', (addedAsset) => sanitizeSvgAssetRecord(editor, addedAsset));
  editor.on('load', sanitizeAllAssets);
  editor.on('project:load', sanitizeAllAssets);
};

export default registerIconAssetGuard;
