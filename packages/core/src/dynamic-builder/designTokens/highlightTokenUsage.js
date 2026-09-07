import buildTokenUsageMatcher from './buildTokenUsageMatcher.js';
import clearTokenUsageHighlight from './clearTokenUsageHighlight.js';
import getTokenUsageCanvasCss from './getTokenUsageCanvasCss.js';
import injectStylesOnce from '../support/injectStylesOnce.js';

const highlightTokenUsage = (editor, groupKey, tokenName, tokenValue) => {
  clearTokenUsageHighlight(editor);
  const canvasDocument = editor.Canvas && editor.Canvas.getDocument && editor.Canvas.getDocument();
  const canvasWindow = canvasDocument && canvasDocument.defaultView;
  if (!canvasDocument || !canvasDocument.body || !canvasWindow) return null;
  const matchesElement = buildTokenUsageMatcher(canvasDocument, groupKey, tokenName, tokenValue);
  if (!matchesElement) return null;
  injectStylesOnce(canvasDocument, 'db-css-designtokens-usage', getTokenUsageCanvasCss());
  let hitCount = 0;
  Array.from(canvasDocument.body.querySelectorAll('*'))
    .slice(0, 3000)
    .forEach((element) => {
      if (!matchesElement(element, canvasWindow.getComputedStyle(element))) return;
      element.setAttribute('data-db-token-hit', '');
      hitCount += 1;
    });
  return hitCount;
};

export default highlightTokenUsage;
