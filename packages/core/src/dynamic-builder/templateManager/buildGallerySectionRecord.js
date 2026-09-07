import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const buildGallerySectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, ...sectionCopyRecord }, [{ type: 'db-gallery' }]);

export default buildGallerySectionRecord;
