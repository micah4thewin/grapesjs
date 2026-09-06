const estimateDataUrlBytes = (dataUrl) => {
  const commaIndex = String(dataUrl || '').indexOf(',');
  if (commaIndex < 0) return 0;
  const payload = dataUrl.slice(commaIndex + 1);
  const padding = payload.endsWith('==') ? 2 : payload.endsWith('=') ? 1 : 0;
  return Math.round((payload.length * 3) / 4) - padding;
};

export default estimateDataUrlBytes;
