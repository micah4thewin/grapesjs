const minifyCssText = (cssText) =>
  String(cssText || '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();

export default minifyCssText;
