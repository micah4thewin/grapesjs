import resolveUrlOrigin from './resolveUrlOrigin.js';

const enforceScriptOriginAllowlist = (markupText, originAllowlist) => {
  const sourceMarkup = String(markupText == null ? '' : markupText);
  const allowedOrigins = (Array.isArray(originAllowlist) ? originAllowlist : [])
    .map((originValue) => resolveUrlOrigin(originValue))
    .filter(Boolean);
  if (!allowedOrigins.length || typeof DOMParser === 'undefined') return sourceMarkup;
  const parsedDocument = new DOMParser().parseFromString(
    '<!doctype html><html><head></head><body>' + sourceMarkup + '</body></html>',
    'text/html',
  );
  if (!parsedDocument.body) return sourceMarkup;
  parsedDocument.body.querySelectorAll('script[src]').forEach((scriptElement) => {
    const sourceValue = String(scriptElement.getAttribute('src') || '').trim();
    const isRelativeSource = !/^[a-z][a-z0-9+.-]*:|^\/\//i.test(sourceValue);
    if (isRelativeSource) return;
    const scriptOrigin = resolveUrlOrigin(/^\/\//.test(sourceValue) ? 'https:' + sourceValue : sourceValue);
    if (!scriptOrigin || allowedOrigins.indexOf(scriptOrigin) < 0) scriptElement.remove();
  });
  return parsedDocument.body.innerHTML;
};

export default enforceScriptOriginAllowlist;
