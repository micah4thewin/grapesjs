import decodeSvgDataUri from '../icons/decodeSvgDataUri.js';
import isSvgMarkupSafe from '../icons/isSvgMarkupSafe.js';

const isSvgUploadSafe = (dataUrlValue) => {
  if (!/^data:image\/svg\+xml/i.test(String(dataUrlValue || ''))) return true;
  const decodedMarkup = decodeSvgDataUri(dataUrlValue);
  return Boolean(decodedMarkup) && isSvgMarkupSafe(decodedMarkup);
};

export default isSvgUploadSafe;
