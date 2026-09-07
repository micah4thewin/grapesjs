import getSampleTextPatterns from './getSampleTextPatterns.js';
import isPlaceholderCopyText from '../contentComponents/isPlaceholderCopyText.js';
import resolveContentTextDefaults from '../contentComponents/resolveContentTextDefaults.js';

const isSamplePlaceholderText = (textValue) => {
  const trimmedText = String(textValue == null ? '' : textValue).trim();
  if (!trimmedText) return false;
  if (isPlaceholderCopyText(trimmedText, resolveContentTextDefaults(null))) return true;
  return getSampleTextPatterns().some((samplePattern) => samplePattern.test(trimmedText));
};

export default isSamplePlaceholderText;
