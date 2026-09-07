import buildPlaceholderHeadingRecord from './buildPlaceholderHeadingRecord.js';
import buildPlaceholderTextRecord from './buildPlaceholderTextRecord.js';
import buildSectionContentRecord from '../blocks/buildSectionContentRecord.js';

const buildTemplateSectionRecord = (sectionCopyRecord, childRecords) => {
  const headingRecords = sectionCopyRecord.headingText
    ? [
        buildPlaceholderHeadingRecord(
          sectionCopyRecord.headingLevel || '2',
          sectionCopyRecord.headingText,
          sectionCopyRecord.headingSize,
        ),
      ]
    : [];
  const introRecords = sectionCopyRecord.introText
    ? [buildPlaceholderTextRecord(sectionCopyRecord.introText, 'lead')]
    : [];
  const sectionAttributes = {
    ...(sectionCopyRecord.themeName ? { 'data-db-theme': sectionCopyRecord.themeName } : {}),
    ...(sectionCopyRecord.layoutName ? { 'data-db-layout': sectionCopyRecord.layoutName } : {}),
    ...(sectionCopyRecord.anchorId ? { id: sectionCopyRecord.anchorId } : {}),
  };
  return buildSectionContentRecord([...headingRecords, ...introRecords, ...(childRecords || [])], {
    centered: sectionCopyRecord.centered,
    ...(Object.keys(sectionAttributes).length ? { attributes: sectionAttributes } : {}),
  });
};

export default buildTemplateSectionRecord;
