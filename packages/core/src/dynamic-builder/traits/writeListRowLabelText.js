import escapeHtmlText from '../support/escapeHtmlText.js';
import walkComponentTree from '../support/walkComponentTree.js';

const writeListRowLabelText = (linkComponent, labelText) => {
  if (!linkComponent || !linkComponent.get) return;
  const textValue = String(labelText == null ? '' : labelText);
  const textNodes = [];
  walkComponentTree(linkComponent, (visitedComponent) => {
    if (visitedComponent === linkComponent || !visitedComponent.get) return;
    if (String(visitedComponent.get('type') || '') !== 'textnode') return;
    if (String(visitedComponent.get('content') || '').trim()) textNodes.push(visitedComponent);
  });
  if (textNodes.length) {
    textNodes[0].set('content', textValue);
    textNodes.slice(1).forEach((extraNode) => extraNode.remove && extraNode.remove());
    return;
  }
  const childComponents = linkComponent.components ? linkComponent.components() : null;
  if (childComponents && !childComponents.length && linkComponent.get('content')) {
    linkComponent.set('content', escapeHtmlText(textValue));
    return;
  }
  if (linkComponent.append) linkComponent.append({ type: 'textnode', content: textValue });
};

export default writeListRowLabelText;
