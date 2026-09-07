const cleanCustomAssetLabel = (labelValue) =>
  String(labelValue == null ? '' : labelValue)
    .replace(/[^a-zA-Z0-9 .,&()+-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);

export default cleanCustomAssetLabel;
