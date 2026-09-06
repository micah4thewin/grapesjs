const formatByteSize = (byteCount) => {
  if (byteCount >= 1024 * 1024) return `${(byteCount / (1024 * 1024)).toFixed(2)} MB`;
  if (byteCount >= 1024) return `${Math.round(byteCount / 1024)} KB`;
  return `${byteCount} B`;
};

export default formatByteSize;
