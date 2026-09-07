import encodeCanvasToDataUrl from '../photoEditor/encodeCanvasToDataUrl.js';
import loadImageElementFromFile from './loadImageElementFromFile.js';
import resolveCompressedImageFormat from './resolveCompressedImageFormat.js';

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
  canvasElement.getContext('2d').drawImage(imageElement, 0, 0, targetWidth, targetHeight);
  return {
    src: encodeCanvasToDataUrl(canvasElement, resolveCompressedImageFormat(imageFile.type), 82),
    name: imageFile.name,
    type: 'image',
    width: targetWidth,
    height: targetHeight,
    sourceWidth,
    sourceHeight,
  };
};

export default compressImageFileToAsset;
