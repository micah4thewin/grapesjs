const resolveCompressedImageFormat = (sourceMimeType) => {
  const mimeType = String(sourceMimeType || '').toLowerCase();
  if (mimeType === 'image/png') return 'image/png';
  if (mimeType === 'image/webp' || mimeType === 'image/avif') return 'image/webp';
  return 'image/jpeg';
};

export default resolveCompressedImageFormat;
