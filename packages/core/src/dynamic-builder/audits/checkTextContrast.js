import capAuditFindings from './capAuditFindings.js';
import collectVisibleTextElements from './collectVisibleTextElements.js';
import computeContrastRatio from '../support/computeContrastRatio.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';
import resolveEffectiveBackgroundColor from './resolveEffectiveBackgroundColor.js';

const checkTextContrast = (auditContext) => {
  const { canvasBody, canvasWindow } = auditContext;
  if (!canvasBody || !canvasWindow || !canvasWindow.getComputedStyle) return [];
  const findings = [];
  collectVisibleTextElements(canvasBody, canvasWindow).forEach((textElement) => {
    const computedStyle = canvasWindow.getComputedStyle(textElement);
    const fontSize = parseFloat(computedStyle.fontSize) || 16;
    const fontWeight = parseInt(computedStyle.fontWeight, 10) || 400;
    const isLargeText = fontSize > 24 || (fontWeight >= 700 && fontSize > 18.66);
    const requiredRatio = isLargeText ? 3 : 4.5;
    const backgroundColor = resolveEffectiveBackgroundColor(textElement, canvasWindow);
    const contrastRatio = computeContrastRatio(computedStyle.color, backgroundColor);
    if (contrastRatio == null || contrastRatio >= requiredRatio) return;
    findings.push(
      createFindingRecord(
        'error',
        'Contrast',
        'Text ' +
          describeAuditElement(textElement) +
          ' has a contrast ratio of ' +
          contrastRatio.toFixed(2) +
          ':1, below the required ' +
          requiredRatio +
          ':1.',
        'Darken the text or lighten the effective background behind it.',
      ),
    );
  });
  return capAuditFindings(findings, 10, 'Contrast', 'more low-contrast text elements were found');
};

export default checkTextContrast;
