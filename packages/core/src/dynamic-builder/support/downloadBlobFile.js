const downloadBlobFile = (fileName, fileBlob) => {
  const objectUrl = URL.createObjectURL(fileBlob);
  const anchorElement = document.createElement('a');
  anchorElement.href = objectUrl;
  anchorElement.download = fileName;
  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
};

export default downloadBlobFile;
