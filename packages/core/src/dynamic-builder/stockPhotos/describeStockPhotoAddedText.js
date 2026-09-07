import describeUploadSavings from '../mediaComponents/describeUploadSavings.js';

const describeStockPhotoAddedText = (assetRecord, placedOnPage) => {
  if (!assetRecord) return 'That picture could not be added. Try another one.';
  const whereText = placedOnPage ? 'Photo placed on the page' : 'Photo saved to your pictures';
  const creditText = assetRecord.dbAttribution ? ' Credit kept with it: ' + assetRecord.dbAttribution + '.' : '';
  if (!assetRecord.dbStoredBytes)
    return whereText + ', still loading from ' + (assetRecord.dbProvider || 'the photo service') + '.' + creditText;
  const savingsText = describeUploadSavings(
    assetRecord.name,
    assetRecord.dbOriginalBytes,
    assetRecord.dbStoredBytes,
    assetRecord.width,
  );
  return whereText + '. ' + savingsText + '.' + creditText;
};

export default describeStockPhotoAddedText;
