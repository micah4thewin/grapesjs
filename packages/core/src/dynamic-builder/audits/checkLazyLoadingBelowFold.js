import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkLazyLoadingBelowFold = (auditContext) => {
  const { canvasBody, canvasWindow } = auditContext;
  if (!canvasBody || !canvasWindow) return [];
  const viewportHeight = canvasWindow.innerHeight || 800;
  const findings = [];
  canvasBody.querySelectorAll('img').forEach((imageElement) => {
    if (String(imageElement.getAttribute('loading') || '').toLowerCase() === 'lazy') return;
    if (String(imageElement.getAttribute('fetchpriority') || '').toLowerCase() === 'high') return;
    const elementTop = imageElement.getBoundingClientRect().top + (canvasWindow.scrollY || 0);
    if (elementTop <= viewportHeight) return;
    findings.push(
      createFindingRecord(
        'warning',
        'Loading',
        'Below-the-fold image ' + describeAuditElement(imageElement) + ' loads eagerly.',
        'Add loading="lazy" and decoding="async" to images outside the first viewport.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Loading', 'more eager below-the-fold images were found');
};

export default checkLazyLoadingBelowFold;
