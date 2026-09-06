import resolveUrlOrigin from './resolveUrlOrigin.js';

const parseOriginAllowlist = (allowlistText) =>
  String(allowlistText || '')
    .split('\n')
    .map((originLine) => resolveUrlOrigin(originLine))
    .filter((originValue, originIndex, allOrigins) => !!originValue && allOrigins.indexOf(originValue) === originIndex);

export default parseOriginAllowlist;
