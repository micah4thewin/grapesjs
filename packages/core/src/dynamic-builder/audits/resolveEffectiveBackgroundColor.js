import parseColorToRgb from '../support/parseColorToRgb.js';

const resolveEffectiveBackgroundColor = (element, canvasWindow) => {
  let currentElement = element;
  while (currentElement && currentElement.nodeType === 1) {
    const backgroundColor = canvasWindow.getComputedStyle(currentElement).backgroundColor;
    const parsedColor = parseColorToRgb(backgroundColor);
    if (parsedColor && parsedColor.alpha > 0.1) return backgroundColor;
    currentElement = currentElement.parentElement;
  }
  return '#ffffff';
};

export default resolveEffectiveBackgroundColor;
