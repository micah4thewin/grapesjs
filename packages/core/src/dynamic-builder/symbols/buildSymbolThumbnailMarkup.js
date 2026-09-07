import collectSymbolThumbnailShapes from './collectSymbolThumbnailShapes.js';
import wrapPreviewSvgMarkup from '../blockPreviews/wrapPreviewSvgMarkup.js';

const buildSymbolThumbnailMarkup = (editor, symbolRecord) =>
  wrapPreviewSvgMarkup(collectSymbolThumbnailShapes(editor, symbolRecord).join(''));

export default buildSymbolThumbnailMarkup;
