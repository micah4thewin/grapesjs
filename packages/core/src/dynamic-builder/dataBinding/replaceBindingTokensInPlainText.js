import getBindingTokenPattern from './getBindingTokenPattern.js';
import resolveBindingTokenText from './resolveBindingTokenText.js';

const replaceBindingTokensInPlainText = (registry, textValue) =>
  String(textValue == null ? '' : textValue).replace(getBindingTokenPattern(), (tokenMatch, tokenBody) =>
    resolveBindingTokenText(registry, tokenBody),
  );

export default replaceBindingTokensInPlainText;
