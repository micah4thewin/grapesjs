const buildPreviewCircleMarkup = (cx, cy, r, options = {}) => {
  const shapeOpacity = options.opacity === undefined ? 0.24 : options.opacity;
  const fillValue = options.accent ? 'var(--gjs-db-accent, currentColor)' : 'currentColor';
  return (
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + fillValue + '" opacity="' + shapeOpacity + '"/>'
  );
};

export default buildPreviewCircleMarkup;
