import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';

const checkGenericLinkText = (auditContext) => {
  const { canvasBody } = auditContext;
  if (!canvasBody) return [];
  const genericPhrases = ['click here', 'read more', 'learn more'];
  const findings = [];
  canvasBody.querySelectorAll('a').forEach((linkElement) => {
    const normalizedText = String(linkElement.textContent || '')
      .toLowerCase()
      .replace(/[^a-z ]+/g, ' ')
      .replace(/ +/g, ' ')
      .trim();
    if (!genericPhrases.includes(normalizedText)) return;
    findings.push(
      createFindingRecord(
        'warning',
        'Links',
        'Link text "' + normalizedText + '" does not describe its destination.',
        'Rewrite the link so its text alone explains where it leads.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Links', 'more generic links were found');
};

export default checkGenericLinkText;
