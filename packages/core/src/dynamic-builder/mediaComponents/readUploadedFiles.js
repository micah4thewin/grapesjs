const readUploadedFiles = (uploadEvent) => {
  if (!uploadEvent) return [];
  const fileList =
    (uploadEvent.dataTransfer && uploadEvent.dataTransfer.files) || (uploadEvent.target && uploadEvent.target.files);
  return fileList ? Array.prototype.slice.call(fileList) : [];
};

export default readUploadedFiles;
