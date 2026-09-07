import isCanvasElementVisible from './isCanvasElementVisible.js';

const collectVisibleTextElements = (rootElement, canvasWindow) => {
  const textElements = [];
  const skippedTags = ['script', 'style', 'noscript', 'template', 'svg'];
  rootElement.querySelectorAll('*').forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    if (skippedTags.includes(tagName) || (element.closest && element.closest('svg'))) return;
    const hasDirectText = Array.from(element.childNodes).some(
      (childNode) => childNode.nodeType === 3 && String(childNode.textContent || '').trim().length > 1,
    );
    if (!hasDirectText) return;
    if (!isCanvasElementVisible(element, canvasWindow)) return;
    textElements.push(element);
  });
  return textElements;
};

export default collectVisibleTextElements;
