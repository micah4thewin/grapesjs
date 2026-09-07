const vectorPattern = /\.svgz?($|[?#])/i;
const animatedPattern = /\.gif($|[?#])/i;

const isEditableImageAsset = (assetModel) => {
  if (!assetModel || typeof assetModel.get !== 'function') return false;
  const assetType = String(assetModel.get('type') || 'image');
  if (assetType !== 'image') return false;
  const sourceValue = String(assetModel.get('src') || '');
  if (!sourceValue) return false;
  if (sourceValue.indexOf('data:image/svg') === 0 || sourceValue.indexOf('data:image/gif') === 0) return false;
  if (vectorPattern.test(sourceValue) || animatedPattern.test(sourceValue)) return false;
  return true;
};

export default isEditableImageAsset;
