import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkLazyLoadingBelowFold = (auditContext) => {
  const { canvasRoot, canvasWindow } = auditContext;
  if (!canvasRoot || !canvasWindow) return [];
  const viewportHeight = canvasWindow.innerHeight || 800;
  const findings = [];
  canvasRoot.querySelectorAll('img').forEach((imageElement) => {
    if (String(imageElement.getAttribute('loading') || '').toLowerCase() === 'lazy') return;
    if (String(imageElement.getAttribute('fetchpriority') || '').toLowerCase() === 'high') return;
    const elementTop = imageElement.getBoundingClientRect().top + (canvasWindow.scrollY || 0);
    if (elementTop <= viewportHeight) return;
    findings.push(
      createFindingRecord(
        'warning',
        'Loading',
        describeAuditElement(imageElement) + ' sits below the first screen but loads immediately.',
        'Switch it to lazy loading so the top of the page appears faster.',
        buildFindingDetails(imageElement, 'lazy-loading'),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Loading', 'more eager below-the-fold images were found');
};

export default checkLazyLoadingBelowFold;
