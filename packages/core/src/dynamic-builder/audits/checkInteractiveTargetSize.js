import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';
import isCanvasElementVisible from './isCanvasElementVisible.js';
import resolveAuditThreshold from './resolveAuditThreshold.js';

const nativeControlTypes = ['hidden', 'checkbox', 'radio', 'range', 'color', 'file'];
const textEntryTags = ['input', 'select', 'textarea'];

const checkInteractiveTargetSize = (auditContext) => {
  const { canvasRoot, canvasWindow } = auditContext;
  if (!canvasRoot || !canvasWindow || !canvasWindow.getComputedStyle) return [];
  const minimumSize = resolveAuditThreshold(auditContext, 'minTargetSizePx');
  const recommendedSize = resolveAuditThreshold(auditContext, 'recommendedTargetSizePx');
  const findings = [];
  let belowRecommendedCount = 0;
  canvasRoot.querySelectorAll('a, button, input, select, textarea, [role="button"]').forEach((targetElement) => {
    if (!isCanvasElementVisible(targetElement, canvasWindow)) return;
    const tagName = targetElement.tagName.toLowerCase();
    const inputType = String(targetElement.getAttribute('type') || '').toLowerCase();
    if (tagName === 'input' && nativeControlTypes.includes(inputType)) return;
    const computedStyle = canvasWindow.getComputedStyle(targetElement);
    if (tagName === 'a' && computedStyle.display === 'inline') return;
    const boundingRect = targetElement.getBoundingClientRect();
    const measuredSize = textEntryTags.includes(tagName)
      ? boundingRect.height
      : Math.min(boundingRect.width, boundingRect.height);
    if (measuredSize >= recommendedSize - 0.5) return;
    if (measuredSize >= minimumSize - 0.5) {
      belowRecommendedCount += 1;
      return;
    }
    const sizeLabel = Math.round(boundingRect.width) + 'x' + Math.round(boundingRect.height) + 'px';
    findings.push(
      createFindingRecord(
        'warning',
        'Target size',
        describeAuditElement(targetElement) + ' is only ' + sizeLabel + ', under the ' + minimumSize + 'px minimum.',
        'Add padding or a minimum height so fingers can hit it; ' + recommendedSize + 'px is comfortable.',
        buildFindingDetails(targetElement),
      ),
    );
  });
  const cappedFindings = capAuditFindings(findings, auditContext, 'Target size', 'more small targets were found');
  if (belowRecommendedCount > 0) {
    cappedFindings.push(
      createFindingRecord(
        'info',
        'Target size',
        belowRecommendedCount + ' tap targets are between ' + minimumSize + ' and ' + recommendedSize + 'px.',
        'They meet the minimum; aim for ' + recommendedSize + 'px on buttons visitors use on phones.',
      ),
    );
  }
  return cappedFindings;
};

export default checkInteractiveTargetSize;
