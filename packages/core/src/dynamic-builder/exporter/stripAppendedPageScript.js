const stripAppendedPageScript = (pageMarkup, pageScriptText) => {
  const sourceMarkup = String(pageMarkup == null ? '' : pageMarkup);
  const scriptText = String(pageScriptText || '').trim();
  if (!scriptText) return sourceMarkup;
  const wrappedMarkup = '<script>' + scriptText + '</script>';
  if (sourceMarkup.endsWith(wrappedMarkup)) return sourceMarkup.slice(0, -wrappedMarkup.length);
  const lastOpenIndex = sourceMarkup.lastIndexOf('<script>');
  if (lastOpenIndex < 0 || !sourceMarkup.trimEnd().endsWith('</script>')) return sourceMarkup;
  const trailingBlock = sourceMarkup.slice(lastOpenIndex);
  const innerText = trailingBlock
    .replace(/^<script>/, '')
    .replace(/<\/script>\s*$/, '')
    .trim();
  return innerText && scriptText.indexOf(innerText) >= 0 ? sourceMarkup.slice(0, lastOpenIndex) : sourceMarkup;
};

export default stripAppendedPageScript;
