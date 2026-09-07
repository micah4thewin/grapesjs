import doesSelectorMatchDocuments from './doesSelectorMatchDocuments.js';
import extractCssRuleSelectors from './extractCssRuleSelectors.js';

const doesCssChunkMatchDocuments = (cssText, matchDocuments) => {
  if (!Array.isArray(matchDocuments) || !matchDocuments.length) return true;
  const selectorList = extractCssRuleSelectors(cssText);
  if (!selectorList.length) return true;
  return selectorList.some((selectorText) => doesSelectorMatchDocuments(selectorText, matchDocuments));
};

export default doesCssChunkMatchDocuments;
