const readDeviceSizeValue = (sizeValue) => {
  if (typeof sizeValue === 'number' && Number.isFinite(sizeValue)) return `${sizeValue}px`;
  if (typeof sizeValue === 'string' && sizeValue.trim()) return sizeValue.trim();
  return null;
};

export default readDeviceSizeValue;
