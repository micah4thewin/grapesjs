const buildStockPhotoImageFile = (imageBlob, fileName) => {
  const mimeType = String(imageBlob.type || '') || 'image/jpeg';
  if (typeof File === 'function') return new File([imageBlob], fileName, { type: mimeType });
  imageBlob.name = fileName;
  return imageBlob;
};

export default buildStockPhotoImageFile;
