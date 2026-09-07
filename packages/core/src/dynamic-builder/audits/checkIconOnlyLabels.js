import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const hasIconLabel = (hostElement, svgElement) =>
  String(hostElement.getAttribute('aria-label') || '').trim() ||
  hostElement.getAttribute('aria-labelledby') ||
  String(hostElement.getAttribute('title') || '').trim() ||
  String(svgElement.getAttribute('aria-label') || '').trim() ||
  svgElement.getAttribute('aria-labelledby');

const checkIconOnlyLabels = (auditContext) => {
  const { canvasRoot } = auditContext;
  if (!canvasRoot) return [];
  const findings = [];
  const flaggedHosts = [];
  canvasRoot.querySelectorAll('svg').forEach((svgElement) => {
    const hostElement = svgElement.parentElement;
    if (!hostElement || flaggedHosts.includes(hostElement)) return;
    if (hostElement.closest && hostElement.closest('[aria-hidden="true"]')) return;
    if (svgElement.getAttribute('aria-hidden') === 'true') return;
    if (String(hostElement.textContent || '').trim()) return;
    const hostTag = hostElement.tagName.toLowerCase();
    if (hostTag === 'a' || hostTag === 'button' || hostTag === 'body') return;
    if (hasIconLabel(hostElement, svgElement)) return;
    flaggedHosts.push(hostElement);
    findings.push(
      createFindingRecord(
        'warning',
        'Icons',
        describeAuditElement(hostElement) + ' shows only an icon with no accessible name.',
        'Give meaningful icons an accessible name, or mark decorative ones hidden from screen readers.',
        buildFindingDetails(hostElement, 'aria-label'),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Icons', 'more unlabeled icon-only elements were found');
};

export default checkIconOnlyLabels;
