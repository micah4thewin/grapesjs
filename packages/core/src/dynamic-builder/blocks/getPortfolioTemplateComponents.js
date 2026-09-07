import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';
import buildTestimonialSampleRecord from './buildTestimonialSampleRecord.js';

const getPortfolioTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateIntroSection(
    'Selected work',
    'A few favorite projects from the last year. Every one shipped on time and on budget.',
  ),
  buildSectionContentRecord([{ type: 'db-gallery' }]),
  buildSectionContentRecord([buildHeadingContentRecord('2', 'Trusted by kind people'), { type: 'db-logo-cloud' }], {
    centered: true,
    attributes: { 'data-db-theme': 'light' },
  }),
  buildSectionContentRecord([buildTestimonialSampleRecord(0)], { attributes: { 'data-db-layout': 'narrow' } }),
  { type: 'db-footer' },
];

export default getPortfolioTemplateComponents;
