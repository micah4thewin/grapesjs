import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';

const checkGenericLinkText = (auditContext) => {
  const { canvasRoot } = auditContext;
  if (!canvasRoot) return [];
  const genericPhrases = ['click here', 'read more', 'learn more', 'here', 'more'];
  const findings = [];
  canvasRoot.querySelectorAll('a').forEach((linkElement) => {
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
        'Link text "' + normalizedText + '" does not say where it leads.',
        'Rewrite the link so its text alone explains the destination, for example "See our pricing".',
        buildFindingDetails(linkElement),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Links', 'more generic links were found');
};

export default checkGenericLinkText;
