import getBindingTokenPattern from './getBindingTokenPattern.js';
import isHtmlBindingToken from './isHtmlBindingToken.js';
import resolveBindingTokenText from './resolveBindingTokenText.js';
import escapeHtmlText from '../support/escapeHtmlText.js';
import sanitizeHtmlMarkup from '../support/sanitizeHtmlMarkup.js';

const replaceBindingTokensInText = (registry, textValue) =>
  String(textValue == null ? '' : textValue).replace(getBindingTokenPattern(), (tokenMatch, tokenBody) => {
    const resolvedText = resolveBindingTokenText(registry, tokenBody);
    return isHtmlBindingToken(tokenBody) ? sanitizeHtmlMarkup(resolvedText) : escapeHtmlText(resolvedText);
  });

export default replaceBindingTokensInText;
