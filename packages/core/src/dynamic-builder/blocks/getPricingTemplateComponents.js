import buildTemplateHeadingRecords from './buildTemplateHeadingRecords.js';
import buildTemplateSectionRecord from './buildTemplateSectionRecord.js';

const getPricingTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateSectionRecord(
    buildTemplateHeadingRecords('Simple, honest pricing', 'Pick a plan now, change it whenever your needs change.'),
  ),
  { type: 'db-pricing' },
  buildTemplateSectionRecord([...buildTemplateHeadingRecords('Pricing questions', ''), { type: 'db-accordion' }]),
  buildTemplateSectionRecord([{ type: 'db-testimonial' }]),
  { type: 'db-footer' },
];

export default getPricingTemplateComponents;
