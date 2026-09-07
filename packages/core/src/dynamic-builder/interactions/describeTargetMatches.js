const describeTargetMatches = (canvasDocument, selectorText) => {
  const trimmedSelector = String(selectorText || '').trim();
  if (!trimmedSelector) return { state: 'self', text: 'Acts on this element' };
  if (!canvasDocument || !canvasDocument.querySelectorAll) return { state: 'unknown', text: '' };
  let matchCount = 0;
  try {
    matchCount = canvasDocument.querySelectorAll(trimmedSelector).length;
  } catch (selectorError) {
    return { state: 'invalid', text: 'Not a valid selector. Use #id or .class, or pick on the page.' };
  }
  if (!matchCount) return { state: 'empty', text: 'Nothing on this page matches yet.' };
  return { state: 'ok', text: 'Matches ' + matchCount + (matchCount === 1 ? ' element' : ' elements') };
};

export default describeTargetMatches;
