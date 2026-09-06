import getPhotoFilterRecords from './getPhotoFilterRecords.js';

const buildCssFilterString = (editState) => {
  const presetRecord = getPhotoFilterRecords().filter((record) => record.filterId === editState.filterId)[0];
  const parts = [
    `brightness(${editState.brightness / 100})`,
    `contrast(${editState.contrast / 100})`,
    `saturate(${editState.saturation / 100})`,
    editState.blur > 0 ? `blur(${editState.blur}px)` : '',
    presetRecord ? presetRecord.cssFilter : '',
  ];
  return parts.filter(Boolean).join(' ');
};

export default buildCssFilterString;
