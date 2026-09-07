import hasDirectTextContent from './hasDirectTextContent.js';
import parseColorToRgb from '../support/parseColorToRgb.js';
import resolveProbeStyleValue from './resolveProbeStyleValue.js';

const probeRecords = {
  type: { probeProperty: 'fontSize', matchProperties: ['fontSize'], textOnly: true },
  space: {
    probeProperty: 'paddingTop',
    matchProperties: ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom', 'rowGap', 'columnGap'],
  },
  radius: { probeProperty: 'borderTopLeftRadius', matchProperties: ['borderTopLeftRadius'] },
  shadow: { probeProperty: 'boxShadow', matchProperties: ['boxShadow'] },
};

const buildTokenUsageMatcher = (canvasDocument, groupKey, tokenName, tokenValue) => {
  const value = String(tokenValue == null ? '' : tokenValue).trim();
  if (!value) return null;
  if (groupKey === 'color') {
    const rgbRecord = parseColorToRgb(value);
    if (!rgbRecord) return null;
    const channels = `${rgbRecord.red}, ${rgbRecord.green}, ${rgbRecord.blue}`;
    const rgbText = rgbRecord.alpha < 1 ? `rgba(${channels}, ${rgbRecord.alpha})` : `rgb(${channels})`;
    return (element, computedStyle) =>
      (hasDirectTextContent(element) && computedStyle.color === rgbText) ||
      computedStyle.backgroundColor === rgbText ||
      computedStyle.borderTopColor === rgbText ||
      computedStyle.outlineColor === rgbText;
  }
  if (groupKey === 'font') {
    const familyName = value
      .split(',')[0]
      .replace(/[\u0022\u0027]/g, '')
      .trim()
      .toLowerCase();
    if (!familyName) return null;
    return (element, computedStyle) =>
      hasDirectTextContent(element) && computedStyle.fontFamily.toLowerCase().indexOf(familyName) >= 0;
  }
  const probeRecord = probeRecords[groupKey];
  if (!probeRecord) return null;
  const probeValue = resolveProbeStyleValue(canvasDocument, probeRecord.probeProperty, value);
  if (!probeValue || probeValue === '0px' || probeValue === 'none') return null;
  return (element, computedStyle) =>
    (!probeRecord.textOnly || hasDirectTextContent(element)) &&
    probeRecord.matchProperties.some((propertyName) => computedStyle[propertyName] === probeValue);
};

export default buildTokenUsageMatcher;
