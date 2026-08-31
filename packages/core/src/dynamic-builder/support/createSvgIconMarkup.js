const createSvgIconMarkup = (innerMarkup, options = {}) => {
  const iconSize = options.size || 16;
  const strokeWidth = options.strokeWidth || 1.75;
  const accessibleLabel = options.label || '';
  const accessibilityAttributes = accessibleLabel
    ? ` role="img" aria-label="${accessibleLabel}"`
    : ' aria-hidden="true"';
  const sharedAttributes = `viewBox="0 0 24 24" width="${iconSize}" height="${iconSize}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"`;
  return `<svg xmlns="http://www.w3.org/2000/svg" ${sharedAttributes}${accessibilityAttributes}>${innerMarkup}</svg>`;
};

export default createSvgIconMarkup;
