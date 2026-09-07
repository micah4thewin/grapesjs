import buildCallToActionSection from './buildCallToActionSection.js';
import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTestimonialSampleRecord from './buildTestimonialSampleRecord.js';
import buildThreeUpSampleColumns from './buildThreeUpSampleColumns.js';

const getLandingTemplateComponents = () => [
  { type: 'db-navbar' },
  { type: 'db-hero' },
  buildSectionContentRecord([{ type: 'db-features' }]),
  buildSectionContentRecord([{ type: 'db-stats' }], { attributes: { 'data-db-theme': 'light' } }),
  buildSectionContentRecord(
    [
      buildHeadingContentRecord('2', 'What customers say'),
      buildThreeUpSampleColumns(buildTestimonialSampleRecord, 'Testimonial trio'),
    ],
    { centered: true },
  ),
  buildCallToActionSection('Ready to get started?', 'Join thousands of happy customers building with us today.'),
  { type: 'db-footer' },
];

export default getLandingTemplateComponents;
