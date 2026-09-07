const fitTemplatePreviewScale = (frameElement, previewWidth = 1200, previewHeight = 2000) => {
  const stageElement = frameElement && frameElement.querySelector('[data-db-template-preview-stage]');
  const iframeElement = frameElement && frameElement.querySelector('[data-db-template-preview]');
  if (!stageElement || !iframeElement) return 1;
  const availableWidth = frameElement.clientWidth || previewWidth;
  const scaleValue = Math.min(1, availableWidth / previewWidth);
  iframeElement.style.width = previewWidth + 'px';
  iframeElement.style.height = previewHeight + 'px';
  iframeElement.style.transform = 'scale(' + scaleValue + ')';
  stageElement.style.width = Math.round(previewWidth * scaleValue) + 'px';
  stageElement.style.height = Math.round(previewHeight * scaleValue) + 'px';
  return scaleValue;
};

export default fitTemplatePreviewScale;
