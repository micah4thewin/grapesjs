const buildPreviewShapeMarkup = (x, y, width, height, options = {}) => {
  const cornerRadius = options.radius === undefined ? 2 : options.radius;
  const shapeOpacity = options.opacity === undefined ? 0.24 : options.opacity;
  const fillValue = options.accent ? 'var(--gjs-db-accent, currentColor)' : 'currentColor';
  return (
    '<rect x="' +
    x +
    '" y="' +
    y +
    '" width="' +
    width +
    '" height="' +
    height +
    '" rx="' +
    cornerRadius +
    '" fill="' +
    fillValue +
    '" opacity="' +
    shapeOpacity +
    '"/>'
  );
};

export default buildPreviewShapeMarkup;
