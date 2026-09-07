const applyImageDimensionsFix = (editor, component) => {
  if (!component || !component.getAttributes) return false;
  const imageElement = component.getEl ? component.getEl() : null;
  const naturalWidth = imageElement ? Math.round(imageElement.naturalWidth || 0) : 0;
  const naturalHeight = imageElement ? Math.round(imageElement.naturalHeight || 0) : 0;
  const boundingRect = imageElement && imageElement.getBoundingClientRect ? imageElement.getBoundingClientRect() : null;
  const widthValue = naturalWidth || (boundingRect ? Math.round(boundingRect.width) : 0);
  const heightValue = naturalHeight || (boundingRect ? Math.round(boundingRect.height) : 0);
  if (!widthValue || !heightValue) return false;
  component.addAttributes({ width: String(widthValue), height: String(heightValue) });
  return true;
};

export default applyImageDimensionsFix;
