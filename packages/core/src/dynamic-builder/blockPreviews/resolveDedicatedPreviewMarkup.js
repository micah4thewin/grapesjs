import getBlockPreviewAliases from './getBlockPreviewAliases.js';
import getBlockPreviewLibrary from './getBlockPreviewLibrary.js';
import wrapPreviewSvgMarkup from './wrapPreviewSvgMarkup.js';

const resolveDedicatedPreviewMarkup = (blockId) => {
  const resolvedId = getBlockPreviewAliases()[blockId] || blockId;
  const directShapes = getBlockPreviewLibrary()[resolvedId];
  return directShapes ? wrapPreviewSvgMarkup(directShapes) : '';
};

export default resolveDedicatedPreviewMarkup;
