import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildFaqSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ layoutName: 'narrow', ...sectionCopyRecord }, [
    { type: 'db-accordion', attributes: { 'data-db-heading-level': '3' } },
  ]);

export default buildFaqSectionRecord;
