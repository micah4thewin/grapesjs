import convertRowsToRecords from './convertRowsToRecords.js';
import parseDelimitedText from './parseDelimitedText.js';

const appendPastedRows = (sourceEntry, pastedText) => {
  const pastedRecords = convertRowsToRecords(parseDelimitedText(pastedText));
  if (!pastedRecords.length) return 0;
  if (!Array.isArray(sourceEntry.value)) sourceEntry.value = [];
  pastedRecords.forEach((pastedRecord) => sourceEntry.value.push(pastedRecord));
  return pastedRecords.length;
};

export default appendPastedRows;
