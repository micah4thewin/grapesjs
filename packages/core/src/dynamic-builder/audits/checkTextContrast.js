import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import collectVisibleTextElements from './collectVisibleTextElements.js';
import computeContrastRatio from '../support/computeContrastRatio.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';
import resolveEffectiveBackgroundColor from './resolveEffectiveBackgroundColor.js';

const checkTextContrast = (auditContext) => {
  const { canvasRoot, canvasWindow } = auditContext;
  if (!canvasRoot || !canvasWindow || !canvasWindow.getComputedStyle) return [];
  const findings = [];
  let unverifiableCount = 0;
  collectVisibleTextElements(canvasRoot, canvasWindow).forEach((textElement) => {
    const computedStyle = canvasWindow.getComputedStyle(textElement);
    const fontSize = parseFloat(computedStyle.fontSize) || 16;
    const fontWeight = parseInt(computedStyle.fontWeight, 10) || 400;
    const isLargeText = fontSize > 24 || (fontWeight >= 700 && fontSize > 18.66);
    const requiredRatio = isLargeText ? 3 : 4.5;
    const backgroundColor = resolveEffectiveBackgroundColor(textElement, canvasWindow);
    if (backgroundColor === null) {
      unverifiableCount += 1;
      return;
    }
    const contrastRatio = computeContrastRatio(computedStyle.color, backgroundColor);
    if (contrastRatio == null || contrastRatio >= requiredRatio) return;
    findings.push(
      createFindingRecord(
        'error',
        'Contrast',
        describeAuditElement(textElement) +
          ' has a contrast ratio of ' +
          contrastRatio.toFixed(2) +
          ':1, below the required ' +
          requiredRatio +
          ':1.',
        'Darken the text or lighten the background behind it.',
        buildFindingDetails(textElement),
      ),
    );
  });
  const cappedFindings = capAuditFindings(findings, auditContext, 'Contrast', 'more low-contrast text elements were found');
  if (unverifiableCount > 0) {
    cappedFindings.push(
      createFindingRecord(
        'info',
        'Contrast',
        unverifiableCount + ' text elements sit on an image or gradient, so their contrast could not be verified.',
        'Check by eye that the text stays readable over the picture, or add a dark overlay behind it.',
      ),
    );
  }
  return cappedFindings;
};

export default checkTextContrast;
