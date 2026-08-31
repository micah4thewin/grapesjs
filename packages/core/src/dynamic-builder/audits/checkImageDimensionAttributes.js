import capAuditFindings from './capAuditFindings.js';
import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';

const checkImageDimensionAttributes = (auditContext) => {
  const findings = [];
  collectImageRecords(auditContext).forEach((imageRecord) => {
    const hasWidth = imageRecord.attributes.width != null && String(imageRecord.attributes.width).trim() !== '';
    const hasHeight = imageRecord.attributes.height != null && String(imageRecord.attributes.height).trim() !== '';
    if (hasWidth && hasHeight) return;
    findings.push(
      createFindingRecord(
        'warning',
        'Images',
        'Image ' + imageRecord.label + ' is missing explicit width and height attributes.',
        'Set both attributes so the browser reserves space and avoids layout shift.',
      ),
    );
  });
  return capAuditFindings(findings, 8, 'Images', 'more images without dimension attributes were found');
};

export default checkImageDimensionAttributes;
