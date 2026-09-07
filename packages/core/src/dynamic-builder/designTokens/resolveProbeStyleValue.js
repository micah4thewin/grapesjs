const resolveProbeStyleValue = (canvasDocument, styleProperty, styleValue) => {
  if (!canvasDocument || !canvasDocument.body || !canvasDocument.defaultView) return '';
  const probeElement = canvasDocument.createElement('div');
  probeElement.style.position = 'absolute';
  probeElement.style.visibility = 'hidden';
  probeElement.style[styleProperty] = styleValue;
  canvasDocument.body.appendChild(probeElement);
  const resolvedValue = canvasDocument.defaultView.getComputedStyle(probeElement)[styleProperty];
  probeElement.remove();
  return resolvedValue || '';
};

export default resolveProbeStyleValue;
