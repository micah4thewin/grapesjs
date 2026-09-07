import buildStockPhotoCardMarkup from './buildStockPhotoCardMarkup.js';

const buildStockPhotoGridMarkup = (photoRecords) =>
  (Array.isArray(photoRecords) ? photoRecords : [])
    .map((photoRecord, photoIndex) => buildStockPhotoCardMarkup(photoRecord, photoIndex))
    .join('');

export default buildStockPhotoGridMarkup;
