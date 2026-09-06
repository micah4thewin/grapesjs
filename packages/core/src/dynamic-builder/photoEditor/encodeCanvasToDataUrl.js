const encodeCanvasToDataUrl = (canvasElement, mimeType, qualityPercent) => {
  const quality = Math.max(0.05, Math.min(1, qualityPercent / 100));
  const encoded = canvasElement.toDataURL(mimeType, quality);
  if (encoded.indexOf(`data:${mimeType}`) === 0) return encoded;
  return canvasElement.toDataURL('image/jpeg', quality);
};

export default encodeCanvasToDataUrl;
