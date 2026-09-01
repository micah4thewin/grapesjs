import loadImageElementFromFile from './loadImageElementFromFile.js';

const compressImageFileToAsset = async (imageFile, maxDimension) => {
  const imageElement = await loadImageElementFromFile(imageFile);
  const sourceWidth = imageElement.naturalWidth || imageElement.width;
  const sourceHeight = imageElement.naturalHeight || imageElement.height;
  const scaleFactor = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight, 1));
  const targetWidth = Math.max(1, Math.round(sourceWidth * scaleFactor));
  const targetHeight = Math.max(1, Math.round(sourceHeight * scaleFactor));
  const canvasElement = document.createElement('canvas');
  canvasElement.width = targetWidth;
  canvasElement.height = targetHeight;
  const drawingContext = canvasElement.getContext('2d');
  drawingContext.drawImage(imageElement, 0, 0, targetWidth, targetHeight);
  const keepsTransparency = imageFile.type === 'image/png' || imageFile.type === 'image/svg+xml';
  const outputDataUrl = keepsTransparency
    ? canvasElement.toDataURL('image/png')
    : canvasElement.toDataURL('image/jpeg', 0.82);
  return {
    src: outputDataUrl,
    name: imageFile.name,
    type: 'image',
    width: targetWidth,
    height: targetHeight,
  };
};

export default compressImageFileToAsset;
