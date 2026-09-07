import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildFeatureGridSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, ...sectionCopyRecord }, [
    { type: 'db-features', attributes: { 'data-db-columns': sectionCopyRecord.columnCount || '3' } },
  ]);

export default buildFeatureGridSectionRecord;
