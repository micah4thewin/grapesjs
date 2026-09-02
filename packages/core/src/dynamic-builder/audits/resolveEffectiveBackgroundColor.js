import compositeColorOver from '../support/compositeColorOver.js';
import parseColorToRgb from '../support/parseColorToRgb.js';

const formatRgbColor = (rgbColor) => 'rgb(' + rgbColor.red + ', ' + rgbColor.green + ', ' + rgbColor.blue + ')';

const resolveEffectiveBackgroundColor = (element, canvasWindow) => {
  const layerColors = [];
  let currentElement = element;
  while (currentElement && currentElement.nodeType === 1) {
    const backgroundColor = canvasWindow.getComputedStyle(currentElement).backgroundColor;
    const parsedColor = parseColorToRgb(backgroundColor);
    if (parsedColor && parsedColor.alpha > 0) {
      layerColors.push(parsedColor);
      if (parsedColor.alpha >= 1) break;
    }
    currentElement = currentElement.parentElement;
  }
  let resolvedColor = { red: 255, green: 255, blue: 255, alpha: 1 };
  for (let layerIndex = layerColors.length - 1; layerIndex >= 0; layerIndex--) {
    resolvedColor = compositeColorOver(layerColors[layerIndex], resolvedColor);
  }
  return formatRgbColor(resolvedColor);
};

export default resolveEffectiveBackgroundColor;
