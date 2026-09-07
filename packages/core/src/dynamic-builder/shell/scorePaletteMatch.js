const scorePaletteMatch = (searchableText, queryText) => {
  const haystack = String(searchableText || '').toLowerCase();
  const needle = String(queryText || '').toLowerCase();
  if (!needle) return 1;
  const substringIndex = haystack.indexOf(needle);
  if (substringIndex >= 0) {
    const startsWord = substringIndex === 0 || haystack.charAt(substringIndex - 1) === ' ';
    return 100 + (startsWord ? 40 : 0) - Math.min(substringIndex, 30);
  }
  let subsequenceScore = 0;
  let searchFrom = 0;
  for (let needleIndex = 0; needleIndex < needle.length; needleIndex += 1) {
    const foundIndex = haystack.indexOf(needle.charAt(needleIndex), searchFrom);
    if (foundIndex < 0) return 0;
    const startsWord = foundIndex === 0 || haystack.charAt(foundIndex - 1) === ' ';
    subsequenceScore += startsWord ? 8 : foundIndex === searchFrom ? 4 : 1;
    searchFrom = foundIndex + 1;
  }
  return subsequenceScore >= needle.length * 2 ? subsequenceScore : 0;
};

export default scorePaletteMatch;
