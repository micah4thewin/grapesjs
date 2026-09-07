import convertRowsToRecords from './convertRowsToRecords.js';
import parseDelimitedText from './parseDelimitedText.js';
import isPlainRecord from '../support/isPlainRecord.js';

const parseImportedText = (fileName, fileText) => {
  const trimmedText = String(fileText || '').trim();
  const looksLikeJson = /\.json$/i.test(fileName) || /^[[{]/.test(trimmedText);
  if (looksLikeJson) {
    try {
      const parsedValue = JSON.parse(trimmedText);
      if (Array.isArray(parsedValue) || isPlainRecord(parsedValue)) return { value: parsedValue, errorMessage: '' };
      return { value: null, errorMessage: 'The JSON file must contain a list of items or a single record.' };
    } catch {
      return { value: null, errorMessage: 'The file is not valid JSON.' };
    }
  }
  const importedRecords = convertRowsToRecords(parseDelimitedText(trimmedText));
  if (!importedRecords.length) {
    return { value: null, errorMessage: 'No rows were found. The first row must hold the field names.' };
  }
  return { value: importedRecords, errorMessage: '' };
};

const importDataSourceFile = (fileObject, onDone) => {
  if (!fileObject || typeof FileReader === 'undefined') {
    onDone(null, 'This browser cannot read files.');
    return;
  }
  const fileReader = new FileReader();
  fileReader.onerror = () => onDone(null, 'The file could not be read.');
  fileReader.onload = () => {
    const parsedResult = parseImportedText(fileObject.name || '', fileReader.result);
    onDone(parsedResult.value, parsedResult.errorMessage);
  };
  fileReader.readAsText(fileObject);
};

export default importDataSourceFile;
