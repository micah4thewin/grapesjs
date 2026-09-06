const sanitizeTokenCssValue = (rawValue) =>
  String(rawValue == null ? '' : rawValue)
    .replace(/\/\*|\*\//g, '')
    .replace(/[<>{};\\]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

export default sanitizeTokenCssValue;
