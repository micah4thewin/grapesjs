import collectBindingAttributeEntries from './collectBindingAttributeEntries.js';
import collectBindingTextNodes from './collectBindingTextNodes.js';
import isHtmlBindingToken from './isHtmlBindingToken.js';
import listBindingTokenBodies from './listBindingTokenBodies.js';
import replaceBindingTokensInPlainText from './replaceBindingTokensInPlainText.js';
import replaceBindingTokensInText from './replaceBindingTokensInText.js';
import replaceTextNodeWithMarkup from './replaceTextNodeWithMarkup.js';
import setResolvedAttributeValue from './setResolvedAttributeValue.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const replaceBindingTokensInElement = (registry, rootElement) => {
  collectBindingTextNodes(rootElement).forEach(({ textNode, rawText }) => {
    if (listBindingTokenBodies(rawText).some(isHtmlBindingToken)) {
      replaceTextNodeWithMarkup(textNode, replaceBindingTokensInText(registry, escapeHtmlText(rawText)));
      return;
    }
    textNode.nodeValue = replaceBindingTokensInPlainText(registry, rawText);
  });
  collectBindingAttributeEntries(rootElement).forEach(({ element, attributeName, rawValue }) =>
    setResolvedAttributeValue(element, attributeName, replaceBindingTokensInPlainText(registry, rawValue)),
  );
};

export default replaceBindingTokensInElement;
