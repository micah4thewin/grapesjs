const shortenAssetName = (nameText) => {
  const cleanName = String(nameText || '').trim();
  if (!cleanName) return 'That picture';
  return cleanName.length > 30 ? `${cleanName.slice(0, 29)}...` : cleanName;
};

const describeAssetEditOffer = (assetModel) => {
  const nameText = assetModel && assetModel.get ? assetModel.get('name') || assetModel.get('src') : '';
  return `${shortenAssetName(nameText)} is on your site. Crop or brighten it?`;
};

export default describeAssetEditOffer;
