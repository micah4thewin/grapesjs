import buildCustomFontIdentifier from './buildCustomFontIdentifier.js';
import clampCustomFontWeight from './clampCustomFontWeight.js';
import getFontFileFormatName from './getFontFileFormatName.js';
import isPlainRecord from '../support/isPlainRecord.js';
import sanitizeFontFamilyName from '../typography/sanitizeFontFamilyName.js';

const fontSourcePattern = /^data:[a-z0-9+.-]+\/[a-z0-9+.-]+;base64,[a-z0-9+\/=]+$/i;

const normalizeCustomFontRecord = (storedRecord) => {
  if (!isPlainRecord(storedRecord)) return null;
  const familyName = sanitizeFontFamilyName(storedRecord.family).slice(0, 60);
  const sourceValue = String(storedRecord.source || '');
  const formatName = getFontFileFormatName(storedRecord.format || storedRecord.fileName);
  if (!familyName || !formatName || !fontSourcePattern.test(sourceValue)) return null;
  const weightValue = clampCustomFontWeight(storedRecord.weight);
  const styleName = storedRecord.style === 'italic' ? 'italic' : 'normal';
  return {
    fontId: buildCustomFontIdentifier(familyName, weightValue, styleName),
    family: familyName,
    weight: weightValue,
    style: styleName,
    format: formatName,
    fileName: String(storedRecord.fileName || '').slice(0, 120),
    byteSize: Math.max(0, Math.round(Number(storedRecord.byteSize) || 0)),
    addedAt: String(storedRecord.addedAt || '').slice(0, 40),
    source: sourceValue,
  };
};

export default normalizeCustomFontRecord;
