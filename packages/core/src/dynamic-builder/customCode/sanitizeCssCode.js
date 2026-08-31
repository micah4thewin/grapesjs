const sanitizeCssCode = (cssCode) =>
  String(cssCode || '')
    .replace(/<\s*\/?\s*style[^>]*>/gi, '')
    .replace(/expression\s*\(/gi, 'blocked(')
    .replace(/url\(\s*[\u0022\u0027]?\s*(javascript|vbscript|data:text\/html):[^)]*\)/gi, 'url()');

export default sanitizeCssCode;
