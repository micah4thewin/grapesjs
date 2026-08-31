import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';
import isCanvasElementVisible from './isCanvasElementVisible.js';

const checkInteractiveTargetSize = (auditContext) => {
  const { canvasBody, canvasWindow } = auditContext;
  if (!canvasBody || !canvasWindow || !canvasWindow.getComputedStyle) return [];
  const findings = [];
  canvasBody.querySelectorAll('a, button, input, select, textarea, [role="button"]').forEach((targetElement) => {
    if (!isCanvasElementVisible(targetElement, canvasWindow)) return;
    if (String(targetElement.getAttribute('type') || '').toLowerCase() === 'hidden') return;
    const computedStyle = canvasWindow.getComputedStyle(targetElement);
    if (targetElement.tagName.toLowerCase() === 'a' && computedStyle.display === 'inline') return;
    const boundingRect = targetElement.getBoundingClientRect();
    if (Math.min(boundingRect.width, boundingRect.height) >= 43.5) return;
    const sizeLabel = Math.round(boundingRect.width) + 'x' + Math.round(boundingRect.height) + 'px';
    findings.push(
      createFindingRecord(
        'warning',
        'Target size',
        'Interactive target ' + describeAuditElement(targetElement) + ' is ' + sizeLabel + ', under the 44px minimum.',
        'Increase padding or size so touch targets are at least 44x44px.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Target size', 'more small interactive targets were found');
};

export default checkInteractiveTargetSize;
