import applyConditionStatesInElement from './applyConditionStatesInElement.js';
import collectBindingAttributeEntries from './collectBindingAttributeEntries.js';
import collectBindingTextNodes from './collectBindingTextNodes.js';
import getDataSourceRegistry from './getDataSourceRegistry.js';
import markBoundPreviewElement from './markBoundPreviewElement.js';
import replaceBindingTokensInPlainText from './replaceBindingTokensInPlainText.js';
import resolveElementBindingContext from './resolveElementBindingContext.js';
import setResolvedAttributeValue from './setResolvedAttributeValue.js';

const applyBindingPreviewInElement = (editor, rootElement, options = {}) => {
  if (!rootElement || !rootElement.querySelectorAll) return;
  const registryRecord = getDataSourceRegistry(editor);
  const contextCache = new Map();
  const skipElements = Array.isArray(options.skipElements) ? options.skipElements.filter(Boolean) : [];
  const isSkipped = (element) =>
    Boolean(element.closest && element.closest('[contenteditable="true"]')) ||
    skipElements.some((skipElement) => skipElement === element || skipElement.contains(element));
  const resolveContext = (element) => resolveElementBindingContext(registryRecord, element, contextCache);
  collectBindingTextNodes(rootElement).forEach(({ textNode, rawText }) => {
    const parentElement = textNode.parentElement;
    if (!parentElement || isSkipped(parentElement)) return;
    const contextRegistry = resolveContext(parentElement);
    if (!contextRegistry) return;
    if (textNode.dbRawText === undefined || rawText !== textNode.dbRawText) textNode.dbRawText = rawText;
    textNode.nodeValue = replaceBindingTokensInPlainText(contextRegistry, rawText);
    markBoundPreviewElement(parentElement, rawText);
  });
  collectBindingAttributeEntries(rootElement).forEach(({ element, attributeName, rawValue }) => {
    if (isSkipped(element)) return;
    const contextRegistry = resolveContext(element);
    if (!contextRegistry) return;
    element.dbRawAttributes = element.dbRawAttributes || {};
    element.dbRawAttributes[attributeName] = rawValue;
    setResolvedAttributeValue(element, attributeName, replaceBindingTokensInPlainText(contextRegistry, rawValue));
    markBoundPreviewElement(element, rawValue);
  });
  applyConditionStatesInElement(rootElement, resolveContext);
};

export default applyBindingPreviewInElement;
