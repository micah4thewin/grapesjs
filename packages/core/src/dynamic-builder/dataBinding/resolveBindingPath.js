const resolveBindingPath = (registry, pathText) => {
  const pathSegments = String(pathText == null ? '' : pathText)
    .trim()
    .split('.')
    .map((pathSegment) => pathSegment.trim())
    .filter(Boolean);
  if (!pathSegments.length) return undefined;
  let currentValue = registry;
  for (const pathSegment of pathSegments) {
    if (currentValue == null) return undefined;
    if (Array.isArray(currentValue)) {
      const indexValue = Number(pathSegment);
      if (!Number.isInteger(indexValue) || indexValue < 0) return undefined;
      currentValue = currentValue[indexValue];
      continue;
    }
    if (typeof currentValue !== 'object') return undefined;
    if (!Object.prototype.hasOwnProperty.call(currentValue, pathSegment)) return undefined;
    currentValue = currentValue[pathSegment];
  }
  return typeof currentValue === 'function' ? undefined : currentValue;
};

export default resolveBindingPath;
