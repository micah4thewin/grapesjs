import createFindingRecord from './createFindingRecord.js';
import resolveSeoRecords from './resolveSeoRecords.js';

const checkDocumentLanguage = (auditContext) => {
  const { siteSeo } = resolveSeoRecords(auditContext);
  const configuredLanguage = String(siteSeo.language || siteSeo.lang || '').trim();
  const documentElement = auditContext.canvasDocument && auditContext.canvasDocument.documentElement;
  const canvasLanguage = documentElement ? String(documentElement.getAttribute('lang') || '').trim() : '';
  if (configuredLanguage || canvasLanguage) return [];
  return [
    createFindingRecord(
      'warning',
      'Language',
      'No site language is set, so exported pages will miss the html lang attribute.',
      'Choose the site language in the SEO settings.',
    ),
  ];
};

export default checkDocumentLanguage;
