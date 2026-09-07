import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkFormControlLabels = (auditContext) => {
  const { canvasRoot } = auditContext;
  if (!canvasRoot) return [];
  const skippedTypes = ['hidden', 'submit', 'button', 'reset', 'image'];
  const labelForValues = Array.from(canvasRoot.querySelectorAll('label[for]')).map((labelElement) =>
    labelElement.getAttribute('for'),
  );
  const findings = [];
  canvasRoot.querySelectorAll('input, select, textarea').forEach((controlElement) => {
    const controlType = String(controlElement.getAttribute('type') || '').toLowerCase();
    if (skippedTypes.includes(controlType)) return;
    const hasAriaLabel =
      String(controlElement.getAttribute('aria-label') || '').trim() || controlElement.getAttribute('aria-labelledby');
    const hasWrappingLabel = !!(controlElement.closest && controlElement.closest('label'));
    const controlId = controlElement.getAttribute('id');
    const hasForLabel = !!controlId && labelForValues.includes(controlId);
    if (hasAriaLabel || hasWrappingLabel || hasForLabel) return;
    findings.push(
      createFindingRecord(
        'error',
        'Forms',
        describeAuditElement(controlElement) + ' has no label.',
        'Add a visible label above the field, or an accessible name in its settings.',
        buildFindingDetails(controlElement, 'aria-label'),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Forms', 'more unlabeled form controls were found');
};

export default checkFormControlLabels;
