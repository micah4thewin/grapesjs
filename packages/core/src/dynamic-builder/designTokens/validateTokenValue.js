import parseColorToRgb from '../support/parseColorToRgb.js';

const lengthPattern = /^(0|-?\d*\.?\d+(px|rem|em|%|vw|vh|vmin|vmax|ch|ex))$/i;
const cssFunctionPattern = /^(clamp|calc|min|max|var)\(/i;
const durationPattern = /^\d*\.?\d+m?s$/i;
const easingPattern = /^(linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier\(.+\)|steps\(.+\))$/i;
const unsafePattern = /\/\*|\*\/|[<>{};\\]/;
const sizeMessages = {
  type: 'Enter a text size like 1.25rem or 20px',
  space: 'Enter a spacing like 1rem or 16px',
  radius: 'Enter a rounding like 0.5rem, 8px or 999px',
};

const validateTokenValue = (groupKey, tokenName, rawValue) => {
  const value = String(rawValue == null ? '' : rawValue).trim();
  if (!value) return '';
  if (unsafePattern.test(value)) return 'Remove special characters such as { } < > ; or /*';
  const isLength = lengthPattern.test(value) || cssFunctionPattern.test(value);
  if (sizeMessages[groupKey]) return isLength ? '' : sizeMessages[groupKey];
  if (groupKey === 'color') {
    const isColor = !!parseColorToRgb(value) || cssFunctionPattern.test(value) || /^(transparent|currentcolor)$/i.test(value);
    return isColor ? '' : 'Enter a colour like #1f5eff or rgb(31, 94, 255)';
  }
  if (groupKey === 'font') return /[a-z]/i.test(value) ? '' : 'Enter one or more font names separated by commas';
  if (groupKey === 'shadow') {
    const isShadow = /^none$/i.test(value) || /\d/.test(value) || cssFunctionPattern.test(value);
    return isShadow ? '' : 'Enter a shadow like 0 8px 20px rgba(15, 23, 42, 0.12), or none';
  }
  if (groupKey !== 'motion') return '';
  if (/^duration/.test(String(tokenName))) return durationPattern.test(value) ? '' : 'Enter a time like 200ms';
  return easingPattern.test(value) || cssFunctionPattern.test(value)
    ? ''
    : 'Enter an easing like ease-out or cubic-bezier(0.33, 1, 0.68, 1)';
};

export default validateTokenValue;
