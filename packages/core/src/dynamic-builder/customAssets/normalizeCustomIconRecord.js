import cleanCustomAssetLabel from './cleanCustomAssetLabel.js';
import cleanIconKeywordsText from './cleanIconKeywordsText.js';
import isPlainRecord from '../support/isPlainRecord.js';
import isSvgMarkupSafe from '../icons/isSvgMarkupSafe.js';

const customIconNamePattern = /^custom:[a-z0-9-]+$/;

const normalizeCustomIconRecord = (storedRecord) => {
  if (!isPlainRecord(storedRecord)) return null;
  const labelText = cleanCustomAssetLabel(storedRecord.label);
  const iconName = String(storedRecord.iconName || '');
  const markupText = String(storedRecord.markup || '');
  if (!labelText || !customIconNamePattern.test(iconName) || !markupText) return null;
  if (!isSvgMarkupSafe(markupText)) return null;
  return {
    iconName,
    label: labelText,
    keywords: cleanIconKeywordsText(storedRecord.keywords),
    markup: markupText,
    fileName: String(storedRecord.fileName || '').slice(0, 120),
    byteSize: Math.max(0, Math.round(Number(storedRecord.byteSize) || 0)),
    addedAt: String(storedRecord.addedAt || '').slice(0, 40),
  };
};

export default normalizeCustomIconRecord;
