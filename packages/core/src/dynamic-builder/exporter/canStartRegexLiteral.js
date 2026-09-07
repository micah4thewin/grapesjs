const regexStartTokens = '(,=:[!&|?{};+-*%<>~^';
const regexStartWords = [
  'return',
  'typeof',
  'instanceof',
  'in',
  'of',
  'new',
  'delete',
  'void',
  'throw',
  'case',
  'do',
  'else',
];

const canStartRegexLiteral = (outputText) => {
  const trimmedOutput = outputText.replace(/\s+$/, '');
  if (!trimmedOutput) return true;
  const lastCharacter = trimmedOutput[trimmedOutput.length - 1];
  if (regexStartTokens.indexOf(lastCharacter) >= 0) return true;
  return regexStartWords.some((wordText) => new RegExp('(?:^|[^\\w$])' + wordText + '$').test(trimmedOutput));
};

export default canStartRegexLiteral;
