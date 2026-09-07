import buildTestimonialDefaultChildren from '../marketingComponents/buildTestimonialDefaultChildren.js';
import getSampleQuoteRecords from './getSampleQuoteRecords.js';

const buildTestimonialSampleRecord = (sampleIndex) => {
  const quoteRecords = getSampleQuoteRecords();
  const quoteRecord = quoteRecords[sampleIndex % quoteRecords.length];
  const [blockquoteRecord, captionRecord] = buildTestimonialDefaultChildren();
  blockquoteRecord.components[0].components = '\u201C' + quoteRecord.quote + '\u201D';
  const [portraitRecord, attributionRecord] = captionRecord.components;
  portraitRecord.attributes = { ...portraitRecord.attributes, alt: 'Portrait of ' + quoteRecord.name };
  attributionRecord.components[0].components = quoteRecord.name;
  attributionRecord.components[1].components = quoteRecord.role;
  return { type: 'db-testimonial', components: [blockquoteRecord, captionRecord] };
};

export default buildTestimonialSampleRecord;
