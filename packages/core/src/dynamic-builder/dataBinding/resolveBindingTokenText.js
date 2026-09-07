import formatBindingValue from './formatBindingValue.js';
import parseBindingToken from './parseBindingToken.js';
import resolveBindingPath from './resolveBindingPath.js';

const resolveBindingTokenText = (registry, tokenBody) => {
  const { pathText, filterName } = parseBindingToken(tokenBody);
  return formatBindingValue(resolveBindingPath(registry, pathText), filterName);
};

export default resolveBindingTokenText;
