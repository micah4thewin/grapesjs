import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkOversizedImages = (auditContext) => {
  const { canvasRoot } = auditContext;
  if (!canvasRoot) return [];
  const findings = [];
  canvasRoot.querySelectorAll('img').forEach((imageElement) => {
    const naturalWidth = imageElement.naturalWidth || 0;
    const displayedWidth = imageElement.getBoundingClientRect().width;
    if (!naturalWidth || displayedWidth < 1) return;
    if (naturalWidth <= displayedWidth * 2) return;
    findings.push(
      createFindingRecord(
        'warning',
        'Images',
        describeAuditElement(imageElement) +
          ' is ' +
          naturalWidth +
          'px wide but displays at ' +
          Math.round(displayedWidth) +
          'px.',
        'Resize or compress the picture so it is at most twice its displayed width.',
        buildFindingDetails(imageElement),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Images', 'more oversized images were found');
};

export default checkOversizedImages;
