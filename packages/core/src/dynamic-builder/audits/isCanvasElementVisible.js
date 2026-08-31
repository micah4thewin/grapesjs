const isCanvasElementVisible = (element, canvasWindow) => {
  if (!element || !canvasWindow || !canvasWindow.getComputedStyle) return false;
  const computedStyle = canvasWindow.getComputedStyle(element);
  if (!computedStyle || computedStyle.display === 'none' || computedStyle.visibility === 'hidden') return false;
  const boundingRect = element.getBoundingClientRect();
  return boundingRect.width > 0 && boundingRect.height > 0;
};

export default isCanvasElementVisible;
