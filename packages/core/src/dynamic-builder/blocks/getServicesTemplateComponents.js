import buildCallToActionSection from './buildCallToActionSection.js';
import buildHeadingContentRecord from './buildHeadingContentRecord.js';
import buildSectionContentRecord from './buildSectionContentRecord.js';
import buildTemplateIntroSection from './buildTemplateIntroSection.js';

const getServicesTemplateComponents = () => [
  { type: 'db-navbar' },
  buildTemplateIntroSection('What we do', 'Clear scopes, honest timelines, and work we are proud to put our name on.'),
  buildSectionContentRecord([{ type: 'db-features' }]),
  buildSectionContentRecord([{ type: 'db-stats' }], { attributes: { 'data-db-theme': 'light' } }),
  buildSectionContentRecord([buildHeadingContentRecord('2', 'How engagements work'), { type: 'db-accordion' }]),
  buildCallToActionSection(
    'Ready when you are',
    'Tell us about your project and we will reply within one business day.',
  ),
  { type: 'db-footer' },
];

export default getServicesTemplateComponents;
