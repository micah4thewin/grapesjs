import capAuditFindings from './capAuditFindings.js';
import createFindingRecord from './createFindingRecord.js';
import describeAuditElement from './describeAuditElement.js';

const checkOversizedImages = (auditContext) => {
  const { canvasBody } = auditContext;
  if (!canvasBody) return [];
  const findings = [];
  canvasBody.querySelectorAll('img').forEach((imageElement) => {
    const naturalWidth = imageElement.naturalWidth || 0;
    const displayedWidth = imageElement.getBoundingClientRect().width;
    if (!naturalWidth || displayedWidth < 1) return;
    if (naturalWidth <= displayedWidth * 2) return;
    findings.push(
      createFindingRecord(
        'warning',
        'Images',
        'Image ' +
          describeAuditElement(imageElement) +
          ' is ' +
          naturalWidth +
          'px wide but displays at ' +
          Math.round(displayedWidth) +
          'px.',
        'Resize or compress the source so it is at most twice its displayed width.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Images', 'more oversized images were found');
};

export default checkOversizedImages;
