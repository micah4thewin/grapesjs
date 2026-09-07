import doesCssChunkMatchDocuments from './doesCssChunkMatchDocuments.js';
import getCanvasCssRegistry from '../support/getCanvasCssRegistry.js';

const filterRegistryCssChunks = (editor, matchDocuments) => {
  const keptChunks = [];
  getCanvasCssRegistry(editor).forEach((registeredCss) => {
    const cssText = String(registeredCss || '').trim();
    if (!cssText) return;
    if (!matchDocuments || doesCssChunkMatchDocuments(cssText, matchDocuments)) keptChunks.push(cssText);
  });
  return keptChunks.join('\n\n');
};

export default filterRegistryCssChunks;
