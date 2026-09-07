import collectComponentPlainText from '../schema/collectComponentPlainText.js';

const skippedTagNames = ['script', 'style', 'noscript', 'template', 'svg'];

const collectElementCopyText = (rootNode, textFragments) => {
  Array.from(rootNode.childNodes || []).forEach((childNode) => {
    if (childNode.nodeType === 3) {
      textFragments.push(String(childNode.textContent || ''));
      return;
    }
    if (childNode.nodeType !== 1) return;
    if (skippedTagNames.includes(String(childNode.tagName).toLowerCase())) return;
    collectElementCopyText(childNode, textFragments);
  });
};

const collectCanvasCopyText = (auditContext) => {
  if (auditContext.canvasRoot) {
    const textFragments = [];
    collectElementCopyText(auditContext.canvasRoot, textFragments);
    return textFragments.join(' ').replace(/\s+/g, ' ').trim();
  }
  return collectComponentPlainText(auditContext.wrapperComponent);
};

export default collectCanvasCopyText;
