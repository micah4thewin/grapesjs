import getLayoutPlaceholderCopy from '../layoutComponents/getLayoutPlaceholderCopy.js';

const normalizeCopyText = (textValue) =>
  String(textValue || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const isPlaceholderCopyText = (textValue, contentTextDefaults) => {
  const normalizedText = normalizeCopyText(textValue);
  if (!normalizedText) return false;
  const layoutCopy = getLayoutPlaceholderCopy();
  const textDefaults = contentTextDefaults || {};
  const knownCopy = [
    textDefaults.headingText,
    textDefaults.paragraphText,
    ...Object.keys(layoutCopy).map((copyKey) => layoutCopy[copyKey]),
  ];
  return knownCopy.some((copyText) => normalizeCopyText(copyText) === normalizedText);
};

export default isPlaceholderCopyText;
