import getPhotoAspectRecords from './getPhotoAspectRecords.js';

const computeCropRectangle = (sourceWidth, sourceHeight, editState) => {
  const aspectRecord = getPhotoAspectRecords().filter((record) => record.aspectId === editState.aspectId)[0];
  const ratio = aspectRecord ? aspectRecord.ratio : 0;
  let cropWidth = sourceWidth * editState.cropWidth;
  let cropHeight = sourceHeight * editState.cropHeight;
  if (ratio > 0) {
    if (cropWidth / cropHeight > ratio) cropWidth = cropHeight * ratio;
    else cropHeight = cropWidth / ratio;
  }
  const maxX = Math.max(0, sourceWidth - cropWidth);
  const maxY = Math.max(0, sourceHeight - cropHeight);
  return {
    x: Math.min(maxX, Math.max(0, editState.cropX * sourceWidth)),
    y: Math.min(maxY, Math.max(0, editState.cropY * sourceHeight)),
    width: Math.max(1, Math.round(cropWidth)),
    height: Math.max(1, Math.round(cropHeight)),
  };
};

export default computeCropRectangle;
