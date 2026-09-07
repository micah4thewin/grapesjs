import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildStatsBandSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, themeName: 'light', ...sectionCopyRecord }, [{ type: 'db-stats' }]);

export default buildStatsBandSectionRecord;
