import buildCssFilterString from './buildCssFilterString.js';
import computeCropRectangle from './computeCropRectangle.js';

const renderEditedPhotoCanvas = (imageElement, editState) => {
  const cropRect = computeCropRectangle(imageElement.naturalWidth, imageElement.naturalHeight, editState);
  const rotated = editState.rotation % 180 !== 0;
  const outputWidth = rotated ? cropRect.height : cropRect.width;
  const outputHeight = rotated ? cropRect.width : cropRect.height;
  const scale = Math.min(1, editState.maxWidth / outputWidth);
  const canvasElement = document.createElement('canvas');
  canvasElement.width = Math.max(1, Math.round(outputWidth * scale));
  canvasElement.height = Math.max(1, Math.round(outputHeight * scale));
  const context = canvasElement.getContext('2d');
  if (!context) return canvasElement;
  context.imageSmoothingQuality = 'high';
  context.filter = buildCssFilterString(editState) || 'none';
  context.translate(canvasElement.width / 2, canvasElement.height / 2);
  context.rotate((editState.rotation * Math.PI) / 180);
  context.scale(editState.flipHorizontal ? -1 : 1, editState.flipVertical ? -1 : 1);
  const drawWidth = cropRect.width * scale;
  const drawHeight = cropRect.height * scale;
  context.drawImage(
    imageElement,
    cropRect.x,
    cropRect.y,
    cropRect.width,
    cropRect.height,
    -drawWidth / 2,
    -drawHeight / 2,
    drawWidth,
    drawHeight,
  );
  return canvasElement;
};

export default renderEditedPhotoCanvas;
