import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';

const buildTemplateIntroSection = (headingText, introText, extraRecords = [], sectionOptions = {}) =>
  buildSectionContentRecord([...buildTemplateHeadingRecords(headingText, introText, '1'), ...extraRecords], {
    centered: true,
    ...sectionOptions,
  });

export default buildTemplateIntroSection;
