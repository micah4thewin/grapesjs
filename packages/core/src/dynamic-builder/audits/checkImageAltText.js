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
        'Image ' + imageRecord.label + ' has no alt attribute.',
        'Describe the image, or set alt="" when it is purely decorative.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Images', 'more images without alt attributes were found');
};

export default checkImageAltText;
