const describeAssetFileName = (assetSource) => {
  const sourceText = String(assetSource || '').trim();
  if (!sourceText) return '';
  if (/^data:/i.test(sourceText)) return 'Uploaded image';
  if (/^blob:/i.test(sourceText)) return 'Uploaded image';
  const withoutQuery = sourceText.split(/[?#]/)[0];
  const lastSegment = withoutQuery.split('/').filter(Boolean).pop() || withoutQuery;
  let decodedName = lastSegment;
  try {
    decodedName = decodeURIComponent(lastSegment);
  } catch (decodeError) {
    decodedName = lastSegment;
  }
  return decodedName.length > 28 ? `${decodedName.slice(0, 14)}\u2026${decodedName.slice(-11)}` : decodedName;
};

export default describeAssetFileName;
