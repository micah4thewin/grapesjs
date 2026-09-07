const simplifySelectorText = (selectorText) =>
  String(selectorText || '')
    .replace(/::?[a-zA-Z-]+(\([^)]*\))?/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const doesSelectorMatchDocuments = (selectorText, matchDocuments) => {
  const simplifiedSelector = simplifySelectorText(selectorText);
  if (!simplifiedSelector || simplifiedSelector === '*' || /[>+~,]$/.test(simplifiedSelector)) return true;
  if (/^(?:html|body)$/i.test(simplifiedSelector)) return true;
  try {
    return matchDocuments.some((matchDocument) => !!matchDocument.querySelector(simplifiedSelector));
  } catch (selectorError) {
    return true;
  }
};

export default doesSelectorMatchDocuments;
