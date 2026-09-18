// Two different pictures sharing a digest would swap places on restore, so the
// payload length is mixed into the key alongside the hash.
const buildAssetDigest = (assetText) => {
  const sourceText = String(assetText || '');
  let hashValue = 0x811c9dc5;
  for (let charIndex = 0; charIndex < sourceText.length; charIndex += 1) {
    hashValue ^= sourceText.charCodeAt(charIndex);
    hashValue = Math.imul(hashValue, 0x01000193) >>> 0;
  }
  return hashValue.toString(36) + '-' + sourceText.length.toString(36);
};

export default buildAssetDigest;
