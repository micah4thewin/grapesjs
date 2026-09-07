const readFileAsText = (fileValue) =>
  new Promise((resolveText, rejectRead) => {
    if (!fileValue) {
      rejectRead(new Error('No file selected'));
      return;
    }
    if (typeof fileValue.text === 'function') {
      fileValue.text().then(resolveText, rejectRead);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => resolveText(String(fileReader.result || ''));
    fileReader.onerror = () => rejectRead(fileReader.error || new Error('Unable to read the file'));
    fileReader.readAsText(fileValue);
  });

export default readFileAsText;
