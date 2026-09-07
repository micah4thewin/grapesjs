import formatKeyToken from './formatKeyToken.js';
import isApplePlatform from './isApplePlatform.js';

const formatKeysText = (keysText, options = {}) => {
  const prefersApple = typeof options.isApple === 'boolean' ? options.isApple : isApplePlatform();
  const variantTexts = String(keysText || '')
    .split(',')
    .map((variantText) => variantText.trim())
    .filter(Boolean);
  const appleVariants = variantTexts.filter((variantText) => variantText.indexOf('\u2318') >= 0);
  const otherVariants = variantTexts.filter((variantText) => variantText.indexOf('\u2318') < 0);
  const preferredVariants = prefersApple ? appleVariants : otherVariants;
  const chosenVariants = preferredVariants.length ? preferredVariants : variantTexts;
  return chosenVariants
    .map((variantText) =>
      variantText
        .split('+')
        .map((keyToken) => formatKeyToken(keyToken, prefersApple))
        .filter(Boolean)
        .join('+'),
    )
    .join(' or ');
};

export default formatKeysText;
