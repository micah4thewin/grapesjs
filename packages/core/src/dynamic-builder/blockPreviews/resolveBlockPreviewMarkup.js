import getBlockPreviewAliases from './getBlockPreviewAliases.js';
import getBlockPreviewLibrary from './getBlockPreviewLibrary.js';
import getCategoryPreviewFallbacks from './getCategoryPreviewFallbacks.js';
import wrapPreviewSvgMarkup from './wrapPreviewSvgMarkup.js';

const resolveBlockPreviewMarkup = (blockId, categoryName) => {
  const previewLibrary = getBlockPreviewLibrary();
  const aliasRecords = getBlockPreviewAliases();
  const resolvedId = aliasRecords[blockId] || blockId;
  const directShapes = previewLibrary[resolvedId];
  if (directShapes) return wrapPreviewSvgMarkup(directShapes);
  const fallbackId = getCategoryPreviewFallbacks()[categoryName];
  const fallbackShapes = fallbackId && previewLibrary[fallbackId];
  return fallbackShapes ? wrapPreviewSvgMarkup(fallbackShapes) : '';
};

export default resolveBlockPreviewMarkup;
