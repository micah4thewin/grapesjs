import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkImageAltText = (auditContext) => {
  const findings = [];
  collectImageRecords(auditContext).forEach((imageRecord) => {
    if (imageRecord.attributes.alt != null) return;
    findings.push(
      createFindingRecord(
        'error',
        'Images',
        imageRecord.label + ' has no alt text.',
        'Describe what the picture shows, or mark it decorative so screen readers skip it.',
        buildFindingDetails(imageRecord.target, 'alt-text'),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Images', 'more images without alt text were found');
};

export default checkImageAltText;
