const readFileAsDataUrl = (sourceFile) =>
  new Promise((resolveRead, rejectRead) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolveRead(String(fileReader.result || ''));
    fileReader.onerror = () => rejectRead(new Error('Unable to read the file'));
    fileReader.readAsDataURL(sourceFile);
  });

export default readFileAsDataUrl;
