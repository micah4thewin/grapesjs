import buildFindingDetails from './buildFindingDetails.js';
import capAuditFindings from './capAuditFindings.js';
import collectImageRecords from './collectImageRecords.js';
import createFindingRecord from './createFindingRecord.js';

const hasAttributeValue = (attributeValue) => attributeValue != null && String(attributeValue).trim() !== '';

const checkImageDimensionAttributes = (auditContext) => {
  const findings = [];
  collectImageRecords(auditContext).forEach((imageRecord) => {
    if (hasAttributeValue(imageRecord.attributes.width) && hasAttributeValue(imageRecord.attributes.height)) return;
    findings.push(
      createFindingRecord(
        'warning',
        'Images',
        imageRecord.label + ' has no width and height set.',
        'Set both so the browser reserves the space and the page does not jump while loading.',
        buildFindingDetails(imageRecord.target, 'image-dimensions'),
      ),
    );
  });
  return capAuditFindings(findings, auditContext, 'Images', 'more images without dimensions were found');
};

export default checkImageDimensionAttributes;
