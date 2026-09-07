import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildLogoBandSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, themeName: 'light', ...sectionCopyRecord }, [{ type: 'db-logo-cloud' }]);

export default buildLogoBandSectionRecord;
