import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildPricingSectionWithoutHeading from './buildPricingSectionWithoutHeading.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';
import buildTestimonialSampleRecord from './buildTestimonialSampleRecord.js';

const getPricingTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateIntroSection(
    'Simple, honest pricing',
    'Plans that grow with you. Pick one now and change it whenever your needs change.',
  ),
  buildPricingSectionWithoutHeading(),
  buildSectionContentRecord([buildHeadingContentRecord('2', 'Pricing questions'), { type: 'db-accordion' }], {
    attributes: { 'data-db-theme': 'light' },
  }),
  buildSectionContentRecord([buildTestimonialSampleRecord(1)], { attributes: { 'data-db-layout': 'narrow' } }),
  { type: 'db-footer' },
];

export default getPricingTemplateComponents;
