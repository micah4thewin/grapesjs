import formatByteSizeText from '../support/formatByteSizeText.js';
import isPlainRecord from '../support/isPlainRecord.js';

const buildRevisionMetaText = (revisionRecord) => {
  const metaRecord = isPlainRecord(revisionRecord.meta) ? revisionRecord.meta : null;
  if (!metaRecord) return '';
  const pageNames = Array.isArray(metaRecord.pageNames) ? metaRecord.pageNames.filter(Boolean) : [];
  const visibleNames = pageNames.slice(0, 2).join(', ');
  const hiddenCount = pageNames.length - 2;
  const pagesText = visibleNames + (hiddenCount > 0 ? ' + ' + hiddenCount + ' more' : '');
  const sizeText = metaRecord.byteLength ? formatByteSizeText(metaRecord.byteLength) : '';
  return [pagesText, sizeText].filter(Boolean).join(' \u00b7 ');
};

export default buildRevisionMetaText;
