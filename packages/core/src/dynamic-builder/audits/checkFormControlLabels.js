import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkFormControlLabels = (auditContext) => {
  const { canvasBody } = auditContext;
  if (!canvasBody) return [];
  const skippedTypes = ['hidden', 'submit', 'button', 'reset', 'image'];
  const labelForValues = Array.from(canvasBody.querySelectorAll('label[for]')).map((labelElement) =>
    labelElement.getAttribute('for'),
  );
  const findings = [];
  canvasBody.querySelectorAll('input, select, textarea').forEach((controlElement) => {
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
        'Form control ' + describeAuditElement(controlElement) + ' has no label.',
        'Connect a label element with the for attribute, or add an aria-label.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Forms', 'more unlabeled form controls were found');
};

export default checkFormControlLabels;
