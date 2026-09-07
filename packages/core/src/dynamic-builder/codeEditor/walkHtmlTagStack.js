const voidTagNames = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
];
const optionalCloseTagNames = ['li', 'p', 'td', 'tr', 'th', 'option', 'dt', 'dd', 'thead', 'tbody', 'tfoot'];

const stripIgnoredMarkup = (codeText) =>
  codeText
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|textarea|pre)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '')
    .replace(/<!doctype[^>]*>/gi, '');

const walkHtmlTagStack = (codeText) => {
  const openStack = [];
  const tagPattern = /<\/?([a-zA-Z][a-zA-Z0-9:-]*)\b[^>]*?(\/?)>/g;
  const cleanedText = stripIgnoredMarkup(String(codeText || ''));
  let tagMatch = tagPattern.exec(cleanedText);
  while (tagMatch) {
    const tagName = tagMatch[1].toLowerCase();
    const isClosing = tagMatch[0].indexOf('</') === 0;
    const isSelfClosing = tagMatch[2] === '/' || voidTagNames.indexOf(tagName) >= 0;
    if (isClosing) {
      const openIndex = openStack.lastIndexOf(tagName);
      if (openIndex < 0) {
        return { problem: 'Found </' + tagName + '> but no <' + tagName + '> is open.' };
      }
      const skippedTags = openStack.splice(openIndex + 1);
      const strictSkipped = skippedTags.filter((skippedName) => optionalCloseTagNames.indexOf(skippedName) < 0);
      if (strictSkipped.length) {
        return { problem: 'Found </' + tagName + '> but <' + strictSkipped[strictSkipped.length - 1] + '> is still open.' };
      }
      openStack.pop();
    } else if (!isSelfClosing) {
      openStack.push(tagName);
    }
    tagMatch = tagPattern.exec(cleanedText);
  }
  const unclosedTags = openStack.filter((tagName) => optionalCloseTagNames.indexOf(tagName) < 0);
  if (unclosedTags.length) return { problem: 'A <' + unclosedTags[unclosedTags.length - 1] + '> tag is never closed.' };
  return { problem: '' };
};

export default walkHtmlTagStack;
