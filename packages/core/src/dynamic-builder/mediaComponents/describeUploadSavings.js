import formatByteSize from '../photoEditor/formatByteSize.js';

const describeUploadSavings = (fileName, originalBytes, storedBytes, widthPx) => {
  const widthText = widthPx ? ', ' + widthPx + ' px wide' : '';
  const savedShare = originalBytes > 0 ? Math.round((1 - storedBytes / originalBytes) * 100) : 0;
  if (savedShare <= 0) return fileName + ' added at ' + formatByteSize(storedBytes) + widthText;
  return (
    fileName +
    ': ' +
    formatByteSize(originalBytes) +
    ' to ' +
    formatByteSize(storedBytes) +
    ' (' +
    savedShare +
    '% smaller)' +
    widthText
  );
};

export default describeUploadSavings;
