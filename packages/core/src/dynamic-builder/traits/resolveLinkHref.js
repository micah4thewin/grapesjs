import listSitePageRecords from './listSitePageRecords.js';
import normalizeUrlInput from './normalizeUrlInput.js';
import sanitizeUrlValue from '../support/sanitizeUrlValue.js';

const resolveLinkHref = (editor, linkRecord) => {
  const record = linkRecord || {};
  const address = String(record.address || '').trim();
  if (record.kind === 'page') {
    const pageRecord = listSitePageRecords(editor).find((candidate) => candidate.pageId === String(record.pageId));
    if (!pageRecord) return '#';
    const anchorId = String(record.anchorId || '').trim();
    return anchorId ? `${pageRecord.fileName}#${anchorId}` : pageRecord.fileName;
  }
  if (record.kind === 'email') return address ? `mailto:${address.replace(/^mailto:/i, '')}` : '#';
  if (record.kind === 'phone') {
    const dialDigits = address.replace(/^tel:/i, '').replace(/[^+\d]/g, '');
    return dialDigits ? `tel:${dialDigits}` : '#';
  }
  if (record.kind === 'url') return sanitizeUrlValue(normalizeUrlInput(address).value) || '#';
  if (record.kind === 'file') return sanitizeUrlValue(address) || '#';
  return '#';
};

export default resolveLinkHref;
