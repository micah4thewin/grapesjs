import toSlugText from '../support/toSlugText.js';

const toCamelCaseName = (rawText) => {
  const slugParts = toSlugText(rawText)
    .replace(/[^a-z0-9-]/g, '')
    .split('-')
    .filter(Boolean);
  const camelName = slugParts
    .map((slugPart, partIndex) => (partIndex === 0 ? slugPart : slugPart.charAt(0).toUpperCase() + slugPart.slice(1)))
    .join('');
  return /^[0-9]/.test(camelName) ? 'source' + camelName.charAt(0).toUpperCase() + camelName.slice(1) : camelName;
};

export default toCamelCaseName;
