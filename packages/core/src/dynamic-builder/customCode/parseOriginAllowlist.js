import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const parseOriginAllowlist = (allowlistText) =>
  String(allowlistText || '')
    .split('\n')
    .map((originLine) => sanitizeUrlValue(originLine.trim()).replace(/\/+$/, ''))
    .filter((originValue, originIndex, allOrigins) => !!originValue && allOrigins.indexOf(originValue) === originIndex);

export default parseOriginAllowlist;
