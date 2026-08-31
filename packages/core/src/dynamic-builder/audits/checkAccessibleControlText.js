import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkAccessibleControlText = (auditContext) => {
  const { canvasBody } = auditContext;
  if (!canvasBody) return [];
  const findings = [];
  const resolveAccessibleText = (controlElement) => {
    const ariaLabel = String(controlElement.getAttribute('aria-label') || '').trim();
    const labelledBy = String(controlElement.getAttribute('aria-labelledby') || '').trim();
    const titleText = String(controlElement.getAttribute('title') || '').trim();
    const contentText = String(controlElement.textContent || '').trim();
    const innerImage = controlElement.querySelector('img[alt]');
    const innerImageAlt = innerImage ? String(innerImage.getAttribute('alt') || '').trim() : '';
    const innerSvgLabel = controlElement.querySelector('svg[aria-label]') ? 'labelled' : '';
    return ariaLabel || labelledBy || titleText || contentText || innerImageAlt || innerSvgLabel;
  };
  canvasBody.querySelectorAll('a, button, [role="button"]').forEach((controlElement) => {
    if (resolveAccessibleText(controlElement)) return;
    findings.push(
      createFindingRecord(
        'error',
        'Controls',
        'Interactive control ' + describeAuditElement(controlElement) + ' has no accessible text.',
        'Add visible text or an aria-label so assistive technology can announce the control.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Controls', 'more controls without accessible text were found');
};

export default checkAccessibleControlText;
