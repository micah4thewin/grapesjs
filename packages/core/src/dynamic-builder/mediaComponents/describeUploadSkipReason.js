const describeUploadSkipReason = (uploadedFile) => {
  const fileType = String((uploadedFile && uploadedFile.type) || '');
  const fileName = String((uploadedFile && uploadedFile.name) || 'this file');
  if (fileType.indexOf('image/') === 0) return '';
  if (fileType.indexOf('video/') === 0) {
    return (
      'Skipped ' +
      fileName +
      ': videos are too large to store inside the site. Host the file elsewhere and paste its link in the Video settings.'
    );
  }
  return 'Skipped ' + fileName + ': only pictures can be uploaded.';
};

export default describeUploadSkipReason;
