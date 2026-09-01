import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const getPortfolioTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateSectionRecord([
    ...buildTemplateHeadingRecords(
      'Selected work',
      'A few favorite projects from the last year. Every one shipped on time and on budget.',
    ),
  ]),
  buildTemplateSectionRecord([{ type: 'db-gallery' }]),
  buildTemplateSectionRecord([...buildTemplateHeadingRecords('Trusted by kind people', ''), { type: 'db-logo-cloud' }]),
  buildTemplateSectionRecord([{ type: 'db-testimonial' }]),
  { type: 'db-footer' },
];

export default getPortfolioTemplateComponents;
