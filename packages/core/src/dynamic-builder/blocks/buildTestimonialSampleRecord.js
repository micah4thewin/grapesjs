import buildTestimonialDefaultChildren from '../marketingComponents/buildTestimonialDefaultChildren.js';
import getTestimonialPresetRecords from '../marketingComponents/getTestimonialPresetRecords.js';

const buildTestimonialSampleRecord = (sampleIndex) => {
  const presetRecords = getTestimonialPresetRecords();
  return {
    type: 'db-testimonial',
    components: buildTestimonialDefaultChildren(presetRecords[sampleIndex % presetRecords.length]),
  };
};

export default buildTestimonialSampleRecord;
