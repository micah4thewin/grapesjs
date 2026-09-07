const detectDelimiter = (firstLine) => {
  if (firstLine.indexOf('\t') >= 0) return '\t';
  if (firstLine.indexOf(',') < 0 && firstLine.indexOf(';') >= 0) return ';';
  return ',';
};

const parseDelimitedText = (rawText) => {
  const sourceText = String(rawText == null ? '' : rawText).replace(/\r\n?/g, '\n');
  const delimiter = detectDelimiter(sourceText.split('\n')[0] || '');
  const parsedRows = [];
  let currentRow = [];
  let currentCell = '';
  let insideQuotes = false;
  for (let charIndex = 0; charIndex < sourceText.length; charIndex += 1) {
    const currentChar = sourceText[charIndex];
    if (insideQuotes) {
      if (currentChar === '"' && sourceText[charIndex + 1] === '"') {
        currentCell += '"';
        charIndex += 1;
      } else if (currentChar === '"') insideQuotes = false;
      else currentCell += currentChar;
      continue;
    }
    if (currentChar === '"') insideQuotes = true;
    else if (currentChar === delimiter) {
      currentRow.push(currentCell);
      currentCell = '';
    } else if (currentChar === '\n') {
      currentRow.push(currentCell);
      parsedRows.push(currentRow);
      currentRow = [];
      currentCell = '';
    } else currentCell += currentChar;
  }
  if (currentCell !== '' || currentRow.length) {
    currentRow.push(currentCell);
    parsedRows.push(currentRow);
  }
  return parsedRows.filter((parsedRow) => parsedRow.some((cellText) => String(cellText).trim() !== ''));
};

export default parseDelimitedText;
