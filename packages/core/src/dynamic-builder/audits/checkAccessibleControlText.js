import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const resolveAccessibleText = (controlElement) => {
  const readAttribute = (attributeName) => String(controlElement.getAttribute(attributeName) || '').trim();
  const innerImage = controlElement.querySelector('img[alt]');
  const innerImageAlt = innerImage ? String(innerImage.getAttribute('alt') || '').trim() : '';
  const innerSvgLabel = controlElement.querySelector('svg[aria-label]') ? 'labelled' : '';
  return (
    readAttribute('aria-label') ||
    readAttribute('aria-labelledby') ||
    readAttribute('title') ||
    String(controlElement.textContent || '').trim() ||
    innerImageAlt ||
    innerSvgLabel
  );
};

const checkAccessibleControlText = (auditContext) => {
  const { canvasRoot } = auditContext;
  if (!canvasRoot) return [];
  const findings = [];
  canvasRoot.querySelectorAll('a, button, [role="button"]').forEach((controlElement) => {
    if (resolveAccessibleText(controlElement)) return;
    findings.push(
      createFindingRecord(
        'error',
        'Controls',
        describeAuditElement(controlElement) + ' has no text a screen reader can announce.',
        'Add visible text or an accessible name so assistive technology can announce it.',
        buildFindingDetails(controlElement, 'aria-label'),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Controls', 'more controls without accessible text were found');
};

export default checkAccessibleControlText;
