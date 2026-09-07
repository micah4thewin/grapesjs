import getBlockPreviewLibrary from './getBlockPreviewLibrary.js';
import getCategoryPreviewFallbacks from './getCategoryPreviewFallbacks.js';
import resolveDedicatedPreviewMarkup from './resolveDedicatedPreviewMarkup.js';
import wrapPreviewSvgMarkup from './wrapPreviewSvgMarkup.js';

const resolveBlockPreviewMarkup = (blockId, categoryName) => {
  const dedicatedMarkup = resolveDedicatedPreviewMarkup(blockId);
  if (dedicatedMarkup) return dedicatedMarkup;
  const fallbackId = getCategoryPreviewFallbacks()[categoryName];
  const fallbackShapes = fallbackId && getBlockPreviewLibrary()[fallbackId];
  return fallbackShapes ? wrapPreviewSvgMarkup(fallbackShapes) : '';
};

export default resolveBlockPreviewMarkup;
