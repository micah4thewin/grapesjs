const getPhotoEditState = () => ({
  aspectId: 'free',
  rotation: 0,
  flipHorizontal: false,
  flipVertical: false,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  filterId: 'none',
  maxWidth: 1600,
  format: 'image/webp',
  quality: 82,
  cropX: 0,
  cropY: 0,
  cropWidth: 1,
  cropHeight: 1,
});

export default getPhotoEditState;
