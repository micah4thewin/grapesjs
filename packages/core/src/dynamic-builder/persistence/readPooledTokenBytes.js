// A token ends in the length of the picture it stands for, in base 36, so its
// size is known without reading the picture back.
const readPooledTokenBytes = (assetToken) => {
  const parsedLength = parseInt(String(assetToken).slice(String(assetToken).lastIndexOf('-') + 1), 36);
  return Number.isFinite(parsedLength) ? parsedLength : 0;
};

export default readPooledTokenBytes;
