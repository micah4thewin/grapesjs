import downloadBlobFile from './downloadBlobFile.js';

const downloadTextFile = (fileName, mimeType, textContent) =>
  downloadBlobFile(fileName, new Blob([textContent], { type: mimeType }));

export default downloadTextFile;
