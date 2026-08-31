import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkIconOnlyLabels = (auditContext) => {
  const { canvasBody } = auditContext;
  if (!canvasBody) return [];
  const findings = [];
  const flaggedHosts = [];
  canvasBody.querySelectorAll('svg').forEach((svgElement) => {
    const hostElement = svgElement.parentElement;
    if (!hostElement || flaggedHosts.includes(hostElement)) return;
    if (hostElement.closest && hostElement.closest('[aria-hidden="true"]')) return;
    if (svgElement.getAttribute('aria-hidden') === 'true') return;
    if (String(hostElement.textContent || '').trim()) return;
    const hostTag = hostElement.tagName.toLowerCase();
    if (hostTag === 'a' || hostTag === 'button' || hostTag === 'body') return;
    const hasLabel =
      String(hostElement.getAttribute('aria-label') || '').trim() ||
      hostElement.getAttribute('aria-labelledby') ||
      String(hostElement.getAttribute('title') || '').trim() ||
      String(svgElement.getAttribute('aria-label') || '').trim() ||
      svgElement.getAttribute('aria-labelledby');
    if (hasLabel) return;
    flaggedHosts.push(hostElement);
    findings.push(
      createFindingRecord(
        'warning',
        'Icons',
        'Icon-only element ' + describeAuditElement(hostElement) + ' has no aria-label.',
        'Add aria-label to meaningful icons, or aria-hidden="true" to decorative ones.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Icons', 'more unlabeled icon-only elements were found');
};

export default checkIconOnlyLabels;
