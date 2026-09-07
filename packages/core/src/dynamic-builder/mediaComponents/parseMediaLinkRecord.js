import parseMapLinkCoordinates from './parseMapLinkCoordinates.js';
import parseVideoLinkRecord from './parseVideoLinkRecord.js';

const parseMediaLinkRecord = (linkText) => {
  const sourceText = String(linkText || '').trim();
  if (!sourceText) return null;
  const videoRecord = parseVideoLinkRecord(sourceText);
  if (videoRecord && videoRecord.provider !== 'file') return { kind: 'video', ...videoRecord };
  const mapRecord = parseMapLinkCoordinates(sourceText);
  if (mapRecord) return { kind: 'map', ...mapRecord };
  if (videoRecord) return { kind: 'video', ...videoRecord };
  const looksLikeImage =
    /^data:image\//i.test(sourceText) ||
    /^https?:\/\/\S+\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?\S*)?$/i.test(sourceText);
  if (looksLikeImage) return { kind: 'image', url: sourceText };
  if (/^https?:\/\/\S+$/i.test(sourceText)) return { kind: 'link', url: sourceText };
  return null;
};

export default parseMediaLinkRecord;
