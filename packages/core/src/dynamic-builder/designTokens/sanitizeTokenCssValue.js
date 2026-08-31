const sanitizeTokenCssValue = (rawValue) =>
  String(rawValue == null ? '' : rawValue)
    .replace(/[<>{};]/g, '')
    .trim();

export default sanitizeTokenCssValue;
