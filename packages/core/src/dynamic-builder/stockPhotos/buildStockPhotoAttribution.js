const buildStockPhotoAttribution = (photoRecord) => {
  if (!photoRecord) return '';
  const photographerText = String(photoRecord.photographerName || '').trim() || 'Unknown photographer';
  const providerText = String(photoRecord.providerName || '').trim();
  const licenceText = String(photoRecord.licenceName || '').trim();
  const creditText = providerText
    ? 'Photo by ' + photographerText + ' on ' + providerText
    : 'Photo by ' + photographerText;
  return licenceText ? creditText + ' (' + licenceText + ')' : creditText;
};

export default buildStockPhotoAttribution;
