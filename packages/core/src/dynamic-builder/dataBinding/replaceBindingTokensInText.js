import formatBindingValue from './formatBindingValue.js';
import resolveBindingPath from './resolveBindingPath.js';
import escapeHtmlText from '../support/escapeHtmlText.js';

const replaceBindingTokensInText = (registry, textValue) =>
  String(textValue == null ? '' : textValue).replace(/\{\{db:([^{}]+)\}\}/g, (tokenMatch, pathText) =>
    escapeHtmlText(formatBindingValue(resolveBindingPath(registry, pathText))),
  );

export default replaceBindingTokensInText;
