const formatByExtension = {
  woff2: 'woff2',
  woff: 'woff',
  ttf: 'truetype',
  otf: 'opentype',
  truetype: 'truetype',
  opentype: 'opentype',
};

const getFontFileFormatName = (fileNameValue) => {
  const loweredValue = String(fileNameValue || '')
    .trim()
    .toLowerCase();
  const extensionMatch = loweredValue.match(/\.([a-z0-9]+)$/);
  return formatByExtension[extensionMatch ? extensionMatch[1] : loweredValue] || '';
};

export default getFontFileFormatName;
