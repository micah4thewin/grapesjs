import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';
import buildTestimonialSampleRecord from './buildTestimonialSampleRecord.js';

const getPricingTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateIntroSection('Plans that grow with you', 'Pick a plan now, change it whenever your needs change.'),
  { type: 'db-pricing' },
  buildSectionContentRecord([buildHeadingContentRecord('2', 'Pricing questions'), { type: 'db-accordion' }], {
    attributes: { 'data-db-theme': 'light' },
  }),
  buildSectionContentRecord([buildTestimonialSampleRecord(1)], { attributes: { 'data-db-layout': 'narrow' } }),
  { type: 'db-footer' },
];

export default getPricingTemplateComponents;
