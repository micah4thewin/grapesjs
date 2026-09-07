const truncateAuditSnippet = (snippetValue) => {
  const snippetText = String(snippetValue || '')
    .replace(/\s+/g, ' ')
    .trim();
  return snippetText.length > 30 ? snippetText.slice(0, 29).trim() + '\u2026' : snippetText;
};

export default truncateAuditSnippet;
