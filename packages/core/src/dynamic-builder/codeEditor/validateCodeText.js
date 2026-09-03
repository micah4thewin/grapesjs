import countUnbalancedPairs from './countUnbalancedPairs.js';

const describeBraceProblem = (pairResult, openLabel, closeLabel) => {
  if (pairResult.lowestDepth < 0) return 'There is a ' + closeLabel + ' with no matching ' + openLabel + '.';
  if (pairResult.depth <= 0) return '';
  if (pairResult.depth === 1) return 'One ' + openLabel + ' is never closed.';
  return pairResult.depth + ' ' + openLabel + 's are never closed.';
};

const validateHtmlText = (codeText) => {
  const allTags = codeText.match(/<[a-zA-Z/][^>]*>/g) || [];
  const closeTagCount = allTags.filter((tagText) => tagText.indexOf('</') === 0).length;
  const openTagCount = allTags.filter((tagText) => tagText.indexOf('</') !== 0 && !/\/\s*>$/.test(tagText)).length;
  if (codeText.indexOf('<') >= 0 && codeText.indexOf('>') < 0) return 'A tag is missing its closing angle bracket.';
  if (closeTagCount > openTagCount) return 'There are more closing tags than opening tags.';
  return '';
};

const validateCssText = (codeText) => {
  const braceResult = countUnbalancedPairs(codeText, '{', '}');
  if (braceResult.unterminatedComment) return 'A comment is never closed.';
  return describeBraceProblem(braceResult, 'block', 'closing brace');
};

const validateJavaScriptText = (codeText) => {
  const pairSpecs = [
    { open: '{', close: '}', openLabel: 'block', closeLabel: 'closing brace' },
    { open: '(', close: ')', openLabel: 'bracket', closeLabel: 'closing bracket' },
    { open: '[', close: ']', openLabel: 'square bracket', closeLabel: 'closing square bracket' },
  ];
  for (let specIndex = 0; specIndex < pairSpecs.length; specIndex += 1) {
    const pairSpec = pairSpecs[specIndex];
    const pairResult = countUnbalancedPairs(codeText, pairSpec.open, pairSpec.close, { lineComments: true });
    if (pairResult.unterminatedComment) return 'A comment is never closed.';
    const pairProblem = describeBraceProblem(pairResult, pairSpec.openLabel, pairSpec.closeLabel);
    if (pairProblem) return pairProblem;
  }
  return '';
};

const validateJsonText = (codeText) => {
  try {
    JSON.parse(codeText);
    return '';
  } catch (parseError) {
    return String(parseError.message || 'That is not valid JSON.');
  }
};

const validateCodeText = (languageName, codeText) => {
  const trimmedText = String(codeText || '').trim();
  if (!trimmedText) return { valid: true, message: '' };
  const validators = {
    html: validateHtmlText,
    css: validateCssText,
    javascript: validateJavaScriptText,
    json: validateJsonText,
  };
  const runValidator = validators[String(languageName)] || validators.html;
  const problemMessage = runValidator(trimmedText);
  return { valid: !problemMessage, message: problemMessage };
};

export default validateCodeText;
