import encodeCanvasToDataUrl from './encodeCanvasToDataUrl.js';
import estimateDataUrlBytes from './estimateDataUrlBytes.js';
import formatByteSize from './formatByteSize.js';
import renderEditedPhotoCanvas from './renderEditedPhotoCanvas.js';

const renderPhotoPreview = (modalElement, imageElement, editState, originalBytes) => {
  const previewHost = modalElement.querySelector('[data-db-photo-preview]');
  if (!previewHost) return '';
  const canvasElement = renderEditedPhotoCanvas(imageElement, editState);
  const dataUrl = encodeCanvasToDataUrl(canvasElement, editState.format, editState.quality);
  previewHost.innerHTML = '';
  canvasElement.className = 'gjs-db-photo-canvas';
  previewHost.appendChild(canvasElement);
  const dimensionsElement = modalElement.querySelector('[data-db-photo-dimensions]');
  const sizeElement = modalElement.querySelector('[data-db-photo-size]');
  const outputBytes = estimateDataUrlBytes(dataUrl);
  if (dimensionsElement) dimensionsElement.textContent = `${canvasElement.width} x ${canvasElement.height} px`;
  if (sizeElement) {
    const savings = originalBytes > 0 ? Math.round((1 - outputBytes / originalBytes) * 100) : 0;
    sizeElement.textContent = `${formatByteSize(outputBytes)}${originalBytes > 0 ? ` (${savings >= 0 ? `${savings}% smaller` : `${Math.abs(savings)}% larger`})` : ''}`;
  }
  return dataUrl;
};

export default renderPhotoPreview;
