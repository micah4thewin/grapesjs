import getCanvasCssRegistry from '../support/getCanvasCssRegistry.js';
import getCssChunkDetectorRecords from './getCssChunkDetectorRecords.js';

const filterRegistryCssChunks = (editor, matchDocuments) => {
  const detectorRecords = getCssChunkDetectorRecords();
  const keptChunks = [];
  getCanvasCssRegistry(editor).forEach((registeredCss, styleId) => {
    const cssText = String(registeredCss || '').trim();
    if (!cssText) return;
    const detectorSelectors = detectorRecords[styleId];
    if (!detectorSelectors || !detectorSelectors.length || !matchDocuments) {
      keptChunks.push(cssText);
      return;
    }
    const chunkIsUsed = matchDocuments.some((matchDocument) =>
      detectorSelectors.some((detectorSelector) => {
        try {
          return !!matchDocument.querySelector(detectorSelector);
        } catch (selectorError) {
          return true;
        }
      }),
    );
    chunkIsUsed && keptChunks.push(cssText);
  });
  return keptChunks.join('\n\n');
};

export default filterRegistryCssChunks;
