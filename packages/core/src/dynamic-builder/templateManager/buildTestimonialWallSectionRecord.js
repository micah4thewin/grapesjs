import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';
import buildTestimonialSampleRecord from '../blocks/buildTestimonialSampleRecord.js';
import buildThreeUpSampleColumns from '../blocks/buildThreeUpSampleColumns.js';

const buildTestimonialWallSectionRecord = (sectionCopyRecord) =>
  buildTemplateSectionRecord({ centered: true, ...sectionCopyRecord }, [
    buildThreeUpSampleColumns(buildTestimonialSampleRecord, 'Testimonial trio'),
  ]);

export default buildTestimonialWallSectionRecord;
