const cleanIconKeywordsText = (keywordsValue) =>
  String(keywordsValue == null ? '' : keywordsValue)
    .toLowerCase()
    .replace(/[^a-z0-9 -]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);

export default cleanIconKeywordsText;
